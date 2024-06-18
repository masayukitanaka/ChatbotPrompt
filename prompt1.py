from openai import OpenAI

client = OpenAI()

prompt="""
あなたは、トヨエース 車のエキスパートです。あなたは、ユーザが画像について以下の質問をしています。
「このランプの意味は何？」
画像についての質問に答えるため、画像に写っている内容をテキストで取得し、それを元に回答を作成してください。車両のオーナーズマニュアルを参照する必要がある場合、画像についての説明だけを提供してください。

    出力形式:
    
    回答は以下の JSON フォーマットにしたがってください。ただし、Unicodeエスケープは避けてください。
    回答にはJSONだけを含めてヘッダや区切り文字は追加しないでください。

    {{
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
        {"type": "text", "text": prompt},
        {
          "type": "image_url",
          "image_url": {
            #"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            "url": "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/sign.jpeg",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0].message.content)
