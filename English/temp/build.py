#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
构建脚本：读取 data/ 下所有月份目录中的 JSON 文章
→ 合并生成 data/article.js
→ 统计单词生成 data/words.js

注意：单词翻译由 AI 在 JSON 文件中直接提供，build.py 仅负责合并
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'READ'
DATA_DIR = ROOT / 'data'
ARTICLE_JS = ROOT / 'data' / 'article.js'
WORDS_JS = ROOT / 'data' / 'words.js'


def collect_all_json_files():
    """收集所有月份目录下的 JSON 文件"""
    json_files = []
    for month_dir in sorted(DATA_DIR.iterdir()):
        if month_dir.is_dir() and month_dir.name not in ('.', '..'):
            for f in sorted(month_dir.glob('*.json')):
                json_files.append(f)
    return json_files


def step1_generate_article_js():
    """读取所有 JSON 合并为 article.js"""
    articles = {}
    for f in collect_all_json_files():
        with open(f, encoding='utf-8') as fh:
            data = json.load(fh)
        key = f.stem
        articles[key] = data

    js_content = 'var APRIL_ARTICLES = ' + json.dumps(articles, indent=2, ensure_ascii=False) + ';\n'
    with open(ARTICLE_JS, 'w', encoding='utf-8') as fh:
        fh.write(js_content)

    print(f"✓ article.js: {len(articles)} 篇文章")
    for key in sorted(articles.keys()):
        a = articles[key]
        print(f"    {key}: {len(a.get('words', []))} 个重点词")


def step2_generate_words_js():
    """统计所有文章单词频次，生成 words.js"""
    word_data = {}
    for f in collect_all_json_files():
        with open(f, encoding='utf-8') as fh:
            data = json.load(fh)
        for item in data.get('words', []):
            if isinstance(item, dict):
                w = item.get('word', '').lower()
                definition = item.get('def', '')
            else:
                w = str(item).lower()
                definition = ''
            if w:
                if w not in word_data:
                    word_data[w] = {'count': 0, 'def': definition}
                word_data[w]['count'] += 1

    sorted_words = sorted(word_data.items(), key=lambda x: (-x[1]['count'], x[0]))

    entries = []
    for word, data in sorted_words:
        entries.append({
            "word": word,
            "def": data['def'],
            "count": data['count']
        })

    js_content = 'var ALL_WORDS = ' + json.dumps(entries, indent=2, ensure_ascii=False) + ';\n'
    with open(WORDS_JS, 'w', encoding='utf-8') as fh:
        fh.write(js_content)

    print(f"\n✓ words.js: {len(entries)} 个不重复重点单词")
    if entries:
        print(f"    出现最多的: {entries[0]['word']} ({entries[0]['count']}次)")


def step3_verify():
    """验证构建结果"""
    print("\n=== 验证构建结果 ===")

    if not ARTICLE_JS.exists():
        print("❌ article.js 文件不存在")
        return False

    try:
        content = ARTICLE_JS.read_text(encoding='utf-8')
        if not content.startswith('var APRIL_ARTICLES = '):
            print("❌ article.js 格式错误：缺少变量声明")
            return False

        json_str = content.replace('var APRIL_ARTICLES = ', '').rstrip().rstrip(';')
        articles = json.loads(json_str)
        print(f"✅ article.js: {len(articles)} 篇文章，格式正确")

        issues = []
        for key, article in articles.items():
            if 'date' not in article:
                issues.append(f"{key}: 缺少 date 字段")
            if 'text' not in article or not article['text']:
                issues.append(f"{key}: 缺少或为空 text 字段")
            else:
                paragraphs = [p.strip() for p in article['text'].split('\n\n') if p.strip()]
                if len(paragraphs) < 3:
                    issues.append(f"{key}: 段落数不足（当前 {len(paragraphs)} 段，应 ≥3 段）")
            if 'questions' not in article or len(article.get('questions', [])) != 5:
                issues.append(f"{key}: 题目数量不为 5（当前 {len(article.get('questions', []))}）")
            if 'words' not in article or len(article.get('words', [])) < 20:
                issues.append(f"{key}: 重点单词过少（当前 {len(article.get('words', []))}）")

            for i, q in enumerate(article.get('questions', [])):
                if not q.get('answer'):
                    issues.append(f"{key} 第{i+1}题: 缺少答案")
                if not q.get('explanation') or q.get('explanation', {}).get('A') in ['N/A', '']:
                    issues.append(f"{key} 第{i+1}题: 缺少解析")

        if issues:
            print("⚠️ 发现以下问题:")
            for issue in issues:
                print(f"   - {issue}")
        else:
            print("✅ 所有文章格式完整（5题/答案/解析/单词）")

    except json.JSONDecodeError as e:
        print(f"❌ article.js JSON 解析失败: {e}")
        return False

    if not WORDS_JS.exists():
        print("❌ words.js 文件不存在")
        return False

    try:
        content = WORDS_JS.read_text(encoding='utf-8')
        if not content.startswith('var ALL_WORDS = '):
            print("❌ words.js 格式错误：缺少变量声明")
            return False

        json_str = content.replace('var ALL_WORDS = ', '').rstrip().rstrip(';')
        words = json.loads(json_str)
        print(f"✅ words.js: {len(words)} 个不重复单词，格式正确")

    except json.JSONDecodeError as e:
        print(f"❌ words.js JSON 解析失败: {e}")
        return False

    return len(issues) == 0


if __name__ == '__main__':
    print("=== 开始构建 ===\n")
    step1_generate_article_js()
    step2_generate_words_js()

    success = step3_verify()

    if success:
        print("\n✅ 构建完成，所有验证通过！")
    else:
        print("\n❌ 构建完成，但存在验证问题，请检查上方提示")