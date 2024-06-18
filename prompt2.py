from openai import OpenAI

client = OpenAI()

question = "このランプの意味は何？"
image_url = "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/sign.jpeg"
carmodel = "トヨエース"

question = "このパーツを英語で言うと？"
image_url = "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/image3.jpg"
carmodel = "トヨタプリウス"


prompt="""
あなたは、{} 車のエキスパートです。あなたは、ユーザが画像について以下の質問をしています。
「{}」
画像についての質問に答えるため、画像に写っている内容をテキストで取得し、それを元に回答を作成してください。車両のオーナーズマニュアルを参照する必要がある場合、画像についての説明だけを提供してください。

    出力形式:
    
    回答は以下の JSON フォーマットにしたがってください。ただし、Unicodeエスケープは避けてください。
    回答にはJSONだけを含めてヘッダや区切り文字は追加しないでください。

    {{
        "original_question": ユーザが質問した内容,
        "lookup_manual": オーナーズマニュアルを参照する必要がある場合はtrue、そうでない場合はfalse。,
        "response_to_user": ユーザへの回答
        "question_to_manual": オーナーズマニュアルに対する質問,
    }}
"""

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": prompt.format(carmodel, question)},
        {
          "type": "image_url",
          "image_url": {
            "url": image_url
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0].message.content)
