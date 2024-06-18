from openai import OpenAI

client = OpenAI()

question = "このランプの意味は何？"
image_url = "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/sign.jpeg"
carmodel = "トヨエース"
"""
$ python prompt1.py 
{
    "lookup_manual": false,
    "response_to_user": "画像に写っているランプは、エンジントラブルを示すチェックエンジン（エンジン警告灯）ランプです。通常、これはエンジン、排気装置、または排出ガス制御システムに問題がある場合に点灯します。",
    "question_to_manual": ""
}

$ python prompt2.py
{
    "lookup_manual": true,
    "response_to_user": "この画像に表示されているランプはエンジンチェックランプです。このランプの意味は車両のオーナーズマニュアルに記載されていますので、詳細についてはマニュアルを参照してください。",
    "question_to_manual": "エンジンチェックランプが点灯した場合の対処方法は何ですか？"
}
"""

question = "このパーツを英語で言うと？"
image_url = "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/image3.jpg"
carmodel = "トヨタプリウス"
"""
{
    "original_question": "このパーツを英語で言うと？",
    "lookup_manual": false,
    "response_to_user": "このパーツは英語で 'rear windshield wiper'（後部ワイパー）と言います。",
    "question_to_manual": ""
}
"""

question = "このバッテリーは使える？"
image_url = "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/image4.png"
carmodel = "トヨタカローラ2020年式"
"""
$ python prompt2.py
{
    "original_question": "このバッテリーは使える？",
    "lookup_manual": true,
    "response_to_user": "画像に写っているバッテリーは、「DieHard RED」と表示されています。トヨタカローラ2020年式に対応するかどうかを確認するためには、オーナーズマニュアルを参照してください。",
    "question_to_manual": "トヨタカローラ2020年式には「DieHard RED」バッテリーが使用可能ですか？"
}
"""
question = "ジャンプスタートをしたいので、電極をどこにつなげばいいか教えて？"
image_url = "https://public-lifecycle-us-west-2.s3.us-west-2.amazonaws.com/image5.png"
carmodel = "トヨタカローラ2020年式"
"""
$ python prompt2.py
{
    "original_question": "ジャンプスタートをしたいので、電極をどこにつなげばいいか教えて？",
    "lookup_manual": true,
    "response_to_user": "トヨタカローラ2020年式のジャンプスタートの方法についてはオーナーズマニュアルを参照する必要があります。",
    "question_to_manual": "トヨタカローラ2020年式のジャンプスタートをする際に、電極をつなげる場所はどこですか？"
}
"""

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
