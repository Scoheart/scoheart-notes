# OpenAI Models Overview (2025)

This document provides a comprehensive overview of OpenAI's current model lineup, including context window sizes and key capabilities.

## Model Comparison Table

| Model Name        | Context Window  | Max Output Tokens | Training Data  | Description                                                                                                                                                                           |
| ----------------- | --------------- | ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GPT-4o**        | 128K tokens     | 16,384 tokens     | Up to Oct 2023 | Latest multimodal flagship model. Processes text and image inputs, generates text outputs. 2x faster than GPT-4 Turbo at half the cost while maintaining the same intelligence level. |
| **GPT-4o mini**   | 128K tokens     | 16,384 tokens     | Up to Oct 2023 | Cost-efficient version of GPT-4o. Recommended replacement for GPT-3.5 Turbo. Balances performance and affordability for most tasks.                                                   |
| **GPT-4 Turbo**   | 128K tokens     | 4,096 tokens      | Up to Apr 2023 | High-performance model with extended context window. Equivalent to ~300 pages of text in a single prompt. Used by 70%+ of GPT-4 API customers.                                        |
| **GPT-4**         | 8K / 32K tokens | 4,096 tokens      | Up to Sep 2021 | Original GPT-4 model. Available in two context window variants. Provides advanced reasoning and complex task handling.                                                                |
| **GPT-4.1**       | 1M tokens       | Variable          | Latest         | Extended context version with 1 million token window. Excellent for processing extensive codebases and long documents.                                                                |
| **GPT-3.5 Turbo** | 16,385 tokens   | 4,096 tokens      | Up to Sep 2021 | Previous generation model. More cost-effective for simpler tasks. Being phased out in favor of GPT-4o mini.                                                                           |

## Reasoning Models (o-Series)

The o-series models are specialized for complex reasoning tasks, using internal "reasoning tokens" to think through problems step-by-step.

| Model Name     | Context Window     | Max Output Tokens | Description                                                                                                                              |
| -------------- | ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **o3**         | 200K tokens        | 100K tokens       | Latest reasoning model. Makes 20% fewer major errors than o1 on difficult real-world tasks. Excels at programming and complex reasoning. |
| **o3-mini**    | 200K tokens        | 100K tokens       | Efficient reasoning model with large context. Cost-effective alternative to o3 for reasoning tasks.                                      |
| **o4-mini**    | 128K / 200K tokens | 100K tokens       | Next-generation compact reasoning model. Balances reasoning capability with efficiency.                                                  |
| **o1**         | 200K tokens        | 100K tokens       | Advanced reasoning model for complex problem-solving. Particularly strong in mathematics, coding, and scientific reasoning.              |
| **o1-mini**    | 128K tokens        | 65,536 tokens     | Smaller, faster reasoning model. Suitable for reasoning tasks with moderate complexity requirements.                                     |
| **o1-preview** | 128K tokens        | 32K tokens        | Early preview version of o1. Demonstrates core reasoning capabilities with limited output.                                               |
| **o1-pro**     | 200K tokens        | 100K tokens       | Professional-tier reasoning model with enhanced capabilities for enterprise use cases.                                                   |

## Next Generation Models

| Model Name | Context Window | Max Output Tokens | Status         | Description                                                                                                        |
| ---------- | -------------- | ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| **GPT-5**  | 400K tokens    | 128K tokens       | In Development | Next-generation model with dramatically expanded context. Features enhanced reasoning and generation capabilities. |

## Key Model Features

### GPT-4o Series

- **Multimodal**: Native support for text and image inputs
- **Speed**: 2x faster generation than GPT-4 Turbo
- **Cost**: 50% cheaper than GPT-4 Turbo
- **Use Cases**: General-purpose AI tasks, chat applications, content generation, image analysis

### o-Series (Reasoning Models)

- **Extended Thinking**: Uses reasoning tokens for step-by-step problem solving
- **Accuracy**: Significantly reduced error rates on complex tasks
- **Specializations**: Mathematics, coding, scientific reasoning, logic puzzles
- **Use Cases**: Software development, research, data analysis, mathematical proofs

### GPT-4.1

- **Massive Context**: 1 million token window for processing extensive documents
- **Use Cases**: Large codebase analysis, document processing, long-form content

### GPT-3.5 Turbo (Legacy)

- **Cost-Effective**: Lower pricing for simple tasks
- **Migration Path**: Users should migrate to GPT-4o mini for better performance at similar cost

## Context Window Comparison

```
GPT-4.1:        ████████████████████████████████████████████████ (1M tokens)
GPT-5:          ████████████████████ (400K tokens)
o-series:       ██████████ (128K-200K tokens)
GPT-4o:         ██████ (128K tokens)
GPT-4 Turbo:    ██████ (128K tokens)
GPT-3.5 Turbo:  █ (16K tokens)
```

## Model Selection Guide

### Choose GPT-4o when:

- You need the latest capabilities and best overall performance
- Working with multimodal inputs (text + images)
- Speed and cost efficiency are important
- General-purpose AI tasks

### Choose GPT-4o mini when:

- Cost is a primary concern
- Tasks don't require the full power of GPT-4o
- Migrating from GPT-3.5 Turbo
- High-volume applications

### Choose o-series when:

- Complex reasoning is required
- Mathematical or scientific problems
- Software development and debugging
- Need step-by-step logical thinking
- Higher accuracy is critical

### Choose GPT-4.1 when:

- Processing extremely large documents or codebases
- Need to maintain context across many pages
- Analyzing comprehensive datasets

## Notes

- **Reasoning Tokens**: o-series models use internal reasoning tokens that consume context window space but are not visible via API
- **Training Data**: Newer models have more recent training data cutoffs
- **Availability**: Some models may have limited availability or require specific API access tiers
- **Pricing**: Varies by model; generally, larger context windows and reasoning capabilities increase cost
- **Updates**: OpenAI regularly updates and releases new model versions; check official documentation for latest information

---

_Last Updated: October 2025_
_Source: OpenAI Platform Documentation and official announcements_


# HTTP/HTTPS 代理（如 Clash 的 HTTP 端口 7890）
git config http.proxy  http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
