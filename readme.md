### Solar System Exploration, 1950s – 1960s

  

- [ ] Weather
- [ ] OpenAI
- [x] Find Song from voice clip
- [ ] PDF
- [ ] Compiler 
- [x] Filter/Render Image


### WHOLE BOT GARBAGE IDEAS

  

<details>
<summary>Code Ideas</summary>

```js

// https://nodejs.org/api/child_process.html#child_process_subprocess_kill_signal

// /https://nodejs.org/api/child_process.html#child_process_subprocess_kill_signal

// https://stackoverflow.com/questions/61440104/killing-a-child-process-after-10-seconds-nodejs

setTimeout(() => {
  wc.kill("SIGINFO")
}, 10*1000, 0)

```
</details>

  
  


<details>
<summary>sendMessage Streams</summary>

```js
//send by link
const url = 'https://preview.redd.it/jcqql8h8x1351.jpg?width=640&crop=smart&auto=webp&s=61148c911a1d5155e7d1451105d18241671cf5f0';

https.get(url).on('response', (stream) => {

api.sendMessage({ attachment: [stream] }, event.threadID);

});
```
</details>
  
<details>
<summary>generate-suggest Jenna AI </summary>

[Jenna AI endpoint generate Suggest](https://us-central1-speare.cloudfunctions.net/generate-suggest)


### Body and need Bearer Token
```json
{
  "data": {
    "prefixFragment": [
      {
        "type": "heading-one",
        "children": [
          {
            "text": "about life"
          }
        ]
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": ""
          }
        ]
      }
    ],
    "suffixFragment": [
      {
        "type": "paragraph",
        "children": [
          {
            "text": ""
          }
        ]
      }
    ],
    "contentType": "other",
    "tone": "professional",
    "description": null,
    "avoidTexts": []
  }
}
```


### Emotions
```
### TONES
1. Friendly
2. Professional
3. Persuasive
4. Bold
5. Academic
6. Informative
7. Humorous
8. Formal
9. Casual
10. Authoritative
11. Caring
12. Optimistic
13. Direct
14. Confident
15. Sympathetic
16. Serious
17. Playful
18. Empathetic
19. Inspiring
20. Assertive
```
</details>

  
  

<details>

<summary>Spotify</summary>

### SPOTIFY

```

![Spotify replit](https://replit.com/@imbharat420/Spotify)
https://spotify-recently-played-readme.vercel.app/api?user=31ye3pvdjhhskndt6unwwwuawma4

![spotify-recently-played-readme Github](https://github.com/JeffreyCA/spotify-recently-played-readme)



```



</details>


# Spotify playlist for all users
```

https://github.dev/JeffreyCA/spotify-recently-played-readme
https://developer.spotify.com/console/get-users-currently-playing-track/
https://api.spotify.com/v1/me/player/recently-played
https://spotify-recently-played-readme.vercel.app/api?user=31ye3pvdjhhskndt6unwwwuawma4   username
https://developer.spotify.com/api/search/all.json


Idea should be the 

url?user=id || and check if requested for spotify command recently or not if yes show the spotify list else give link with user?user=id and check user=id present on list or not that should be on database

```


```js
chrome-untrusted://new-tab-page/background.jpg
```


```js
websocket
//https://deepnudeonline.com/image
wss://deepnudeonline.com/socket

{"type":"imageSend","data":{"image":"data:image/png;base64,iVBORw0KGg -------- ","kod":""}}
"{\"type\":\"message\",\"data\":\"ready\"}"

..
..
"{\"type\":\"message\", \"data\" : \"waiting\",\"que\":\"12\",\"que2\":\"0\"}"



"{\"type\":\"message\", \"data\" : \"converting\"}"

"{\"type\":\"imageReady\", \"image\" : \"iVBORw0KGgoAAAANSUhEUgAAAg"}"


https://run.mrepol853.repl.co/
```



```js
//BLUR NUDE
https://deep-nude.co/

https://api.deep-nude.co/
rawData: base64


{
  imgData: BASE64
}
```



```js
https://storage.googleapis.com/reverse-image/235f13cf-01c3-4d2e-a4bd-4f856e248c51.jpeg

https://lens.google.com/uploadbyurl?url=https://storage.googleapis.com/reverse-image/235f13cf-01c3-4d2e-a4bd-4f856e248c51.jpeg

https://serpapi.com/google-reverse-image

https://www.scraperapi.com/blog/best-google-image-search-apis-and-proxies/
```



```
  MORE HERE = https://saucenao.com/search.php
  
  https://trace.moe/?url=<URL OF IMAGE>
  Ex=https://trace.moe/?url=https%3A%2F%2Fsaucenao.com%2Ftools%2Fimages%2Fimagesearchoptions.png



  https://yandex.com/images/search?rpt=imageview&url=<URL of image >
 EX
  https://yandex.com/images/search?rpt=imageview&url=https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png


  https://lens.google.com/uploadbyurl?url=<URL of image > 
  EX : https://lens.google.com/uploadbyurl?url=https://saucenao.com/userdata/Uoc0myQZA.png.png
```



```
  Find movie HTML https://clip.cafe/s/Dictator/category=~year=/


```



```
Tiny Wow
https://tinywow.com/file/upload

Formdata
type: image
mode: profile_photo
file: (binary)


{
    "status": true,
    "file_id": 22392051,
    "url": "https://tinywow.nyc3.digitaloceanspaces.com/2023-03-07_13-02/image_profile_photo/D8WGpBQoLCJnNKUsbjDAbDUA1o5W44I48sDqePs2.png"
}


```

```
ascii  https://text-art.top/3646-music-player
https://text-art.top/wink

https://www.textfacescopy.com/good-morning-text-faces.html

https://cooltext.top/1
```



```
https://en.wikipedia.org/wiki/List_of_country_calling_codes

```


```
AI Generated Images

https://generated.photos/faces/right-facing/gray-hair/joy

https://api.generated.photos/api/frontend/v1/images?page=1&per_page=30&head_pose=right-facing&emotion=joy


https://api.generated.photos/api/frontend/v1/images?page=1&per_page=30&head_pose=right-facing&hair_color=gray&emotion=joy


```


```
"dependencies": {
        "axios": "^1.3.4",
        "google-tts-api": "^2.0.2",
        "googlethis": "^1.7.1",
        "openai": "^3.2.1",
        "weather-js": "^2.0.0",
        "youtubei.js": "^1.4.5"
    }
    ```