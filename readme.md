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

Idea should be the 

url?user=id || and check if requested for spotify command recently or not if yes show the spotify list else give link with user?user=id and check user=id present on list or not that should be on database

```


```js
chrome-untrusted://new-tab-page/background.jpg
```