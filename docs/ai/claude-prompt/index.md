# Prompt

## Being Clear and Direct

Golden Rule of Clear Prompting: show your prompt to a colleague or friend

### Example

1. 我想提问 JavaScript 有哪些包管理器

```markdown
<!-- Bad Case -->

有哪些包管理器？

<!-- Good Case -->

JavaScript 有哪些包管理器？
```

## Assigning Roles - Role Prompting

## Separating Data from Instructions

### prompt Template

### XML tags

## Formatting Output & Speaking for Claude

### 常用格式

- XML
- JSON

### 代替回答

- speaking for Claude
- prefilling Claude’s response

`stop_sequences`

在代替回答中填写更过想要它回答的东西。

## precognition - Thinking Step by Step

- Giving Claude time to think step by step sometimes makes Claude more accurate
- thinking only counts when it's out loud.

- allow Claude to think things out first before answering.

- Claude is sometimes sensitive to ordering

- Claude is more likely to choose the second of two options

- Letting Claude think can shift Claude's answer from incorrect to correct

 <brainstorm>

### Examples

告诉我 2000 年成立的中国互联网大厂有哪些。
首先，在 <brainstorm> 标签中进行头脑风暴，思考有哪些中国互联网大厂，成立的时间是什么时候。
之后再给出准确的答案。

## Few-Shot Prompting

- Giving Claude examples of how you want it to behave (or how you want it not to behave) is extremely effective

- zero-shot
- few-shot
- one-shot
- n-shot

## Avoiding Hallucinations

- Claude sometimes "hallucinates" and makes claims that are untrue or unjustified

- Giving Claude the option to say it doesn't know the answer to a question
- Asking Claude to find evidence before answering

- give Claude an out
- asking for citations

- a great way to reduce hallucinations on long documents is to make Claude gather evidence first.

- Claude's hallucinations can be solved by lowering the "temperature" of Claude's responses

### Beyoncé Hallucination

Beyoncé 是一名歌手，问 claude 的时候，她还没有第八张专辑。

### Prospectus Hallucination
