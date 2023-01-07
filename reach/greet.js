const greets = [
      "Hello there",
      "Hi! How are you?",
      "Good to see you",
      "What's up?",
      "How's it going?",
      "How's everything?",
      "How have you been?",
      "What's new?",
      "How's your day going?",
      "Good to hear from you",
      "Long time no see",
      "It's been a while",
      "How have you been keeping?",
      "How's everything been?",
      "What's been going on?",
      "How's life?",
      "How's your day been?",
      "Salutations",
      "Hi there",
      "Howdy",
      "Sup",
      "Yo",
      "Hey",
      "What's the word?",
      "How's everything going?",
      "How's it been?",
      "What's been happening?",
      "What's the latest?",
      "How's everything been going?",
      "What's been going on lately?",
      "How have you been doing?",
      "How's things?",
      "What's going on?",
      "How have you been holding up?",
      "What's up, my friend?",
      "How's the day treating you?",
      "How's your week been so far?",
      "What's been going on in your world lately?",
      "Good day to you",
      "How are you doing today?",
      "How's the weather been?",
      "How are you feeling today?",
      "How has your day been so far?",
]

const greet = (name) => {
      return greets[Math.floor(Math.random() * greets.length)] + " " + name;
}



export default greet;