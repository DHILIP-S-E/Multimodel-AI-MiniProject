let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}
// window.addEventListener('load',()=>{
//     wishMe()
// })
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})
function takeCommand(message) {
    if (!message) return;

    voice.style.display = "none";
    btn.style.display = "flex";

    // 📌 Basic Commands
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, how can I assist you?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, designed to make life easier!");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } else if (message.includes("weather")) {
        speak("Fetching weather details...");
        window.open("https://www.google.com/search?q=current+weather", "_blank");
    } else if (message.includes("news")) {
        speak("Fetching latest news...");
        window.open("https://news.google.com/", "_blank");
    } else if (message.includes("wikipedia")) {
        let searchQuery = message.replace("wikipedia", "").trim();
        speak("Searching Wikipedia for " + searchQuery);
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, "_blank");
    
    // 📌 Utility Features
    } else if (message.includes("calculator")) {
        speak("Opening calculator...");
        window.open("https://www.calculatorsoup.com/", "_blank");
    } else if (message.includes("notepad")) {
        speak("Opening Notepad...");
        window.open("notepad.exe");
    } else if (message.includes("screenshot")) {
        speak("Taking a screenshot...");
        html2canvas(document.body).then(canvas => {
            document.body.appendChild(canvas);
        });
    } else if (message.includes("camera")) {
        speak("Opening camera...");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                document.querySelector("video").srcObject = stream;
            })
            .catch(err => speak("Camera access denied."));
    } else if (message.includes("battery status")) {
        navigator.getBattery().then(function (battery) {
            let level = battery.level * 100;
            speak(`Your battery is at ${level} percent.`);
        });

    // 📌 Entertainment & Fun
    } else if (message.includes("play music")) {
        let song = message.replace("play music", "").trim();
        speak(`Playing ${song} on YouTube`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
    } else if (message.includes("joke")) {
        let jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I told my wife she should embrace her mistakes. She gave me a hug!"
        ];
        speak(jokes[Math.floor(Math.random() * jokes.length)]);
    } else if (message.includes("quote")) {
        let quotes = [
            "Believe in yourself and all that you are!",
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "The only limit to our realization of tomorrow is our doubts of today."
        ];
        speak(quotes[Math.floor(Math.random() * quotes.length)]);
    } else if (message.includes("tell me a fact")) {
        let facts = [
            "Did you know? The Eiffel Tower can be 15 cm taller during the summer.",
            "Honey never spoils. Archaeologists found honey in Egyptian tombs over 3,000 years old and it was still good.",
            "Bananas are berries, but strawberries aren’t!"
        ];
        speak(facts[Math.floor(Math.random() * facts.length)]);

    // 📌 AI Chat & Productivity
    } else if (message.includes("chat")) {
        let userMessage = message.replace("chat", "").trim();
        let responses = [
            "That's interesting! Tell me more.",
            "I'm here to listen!",
            "That sounds amazing!",
            "Can you explain further?"
        ];
        speak(responses[Math.floor(Math.random() * responses.length)]);
    } else if (message.includes("translate")) {
        speak("Opening Google Translate...");
        window.open("https://translate.google.com/", "_blank");
    } else if (message.includes("dictionary")) {
        let word = message.replace("dictionary", "").trim();
        speak(`Searching dictionary for ${word}`);
        window.open(`https://www.dictionary.com/browse/${word}`, "_blank");
    } else if (message.includes("email")) {
        speak("Opening email client...");
        window.open("mailto:");
    }

    // 📌 System Controls
    else if (message.includes("shutdown")) {
        speak("Shutting down the system...");
        window.open("shutdown.exe");
    } else if (message.includes("restart")) {
        speak("Restarting system...");
        window.open("shutdown.exe /r");
    } else if (message.includes("lock screen")) {
        speak("Locking screen...");
        window.open("rundll32.exe user32.dll,LockWorkStation");
    } else if (message.includes("increase brightness")) {
        speak("Increasing brightness...");
        document.body.style.filter = "brightness(1.5)";
    } else if (message.includes("decrease brightness")) {
        speak("Decreasing brightness...");
        document.body.style.filter = "brightness(0.7)";
    }

    // 📌 Developer Tools
    else if (message.includes("search stack overflow")) {
        let query = message.replace("search stack overflow", "").trim();
        speak(`Searching Stack Overflow for ${query}`);
        window.open(`https://stackoverflow.com/search?q=${encodeURIComponent(query)}`, "_blank");
    } else if (message.includes("search github")) {
        let query = message.replace("search github", "").trim();
        speak(`Searching GitHub for ${query}`);
        window.open(`https://github.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }

    // 📌 Personalization
    else if (message.includes("set nickname")) {
        let name = message.replace("set nickname", "").trim();
        localStorage.setItem("nickname", name);
        speak(`Nickname set to ${name}`);
    } else if (message.includes("change voice")) {
        speak("Changing voice settings...");
        // Code for voice settings change
    }
    else if (message.includes("riddle")) {
        let riddles = [
            "What has to be broken before you can use it? An egg.",
            "The more of me you take, the more you leave behind. What am I? Footsteps.",
            "What can you hold in your left hand but not your right? Your right elbow."
        ];
        speak(riddles[Math.floor(Math.random() * riddles.length)]);
    } else if (message.includes("horoscope")) {
        speak("Checking today's horoscope...");
        window.open("https://www.astrology.com/horoscope/daily.html");
    }

    // 📚 Learning & Knowledge
    else if (message.includes("word meaning")) {
        let word = message.replace("word meaning", "").trim();
        speak(`Searching for the definition of ${word}`);
        window.open(`https://www.dictionary.com/browse/${word}`);
    } else if (message.includes("history fact")) {
        speak("Fetching an interesting historical fact...");
        window.open("https://www.history.com/this-day-in-history");
    } else if (message.includes("explain programming concept")) {
        let concept = message.replace("explain programming concept", "").trim();
        speak(`Searching for an explanation of ${concept}`);
        window.open(`https://www.geeksforgeeks.org/${concept.replace(" ", "-")}/`);
    }

    // 🤖 AI-Powered
    else if (message.includes("ai generated joke")) {
        speak("Fetching an AI-generated joke...");
        window.open("https://official-joke-api.appspot.com/random_joke");
    } else if (message.includes("ask chatgpt")) {
        let query = message.replace("ask chatgpt", "").trim();
        speak(`Asking ChatGPT: ${query}`);
        window.open(`https://chat.openai.com/?q=${encodeURIComponent(query)}`);
    }

    // ⏳ Productivity Tools
    else if (message.includes("sticky note")) {
        speak("Opening sticky notes...");
        window.open("ms-settings:stickynotes");
    } else if (message.includes("pomodoro timer")) {
        speak("Starting Pomodoro timer...");
        window.open("https://pomofocus.io/");
    } else if (message.includes("mind map")) {
        speak("Opening a mind mapping tool...");
        window.open("https://www.mindmup.com/");
    }

    // 👨‍💻 Tech & Coding
    else if (message.includes("search github")) {
        let repo = message.replace("search github", "").trim();
        speak(`Searching GitHub for ${repo}`);
        window.open(`https://github.com/search?q=${encodeURIComponent(repo)}`);
    } else if (message.includes("open-source projects")) {
        speak("Browsing popular open-source projects...");
        window.open("https://opensource.guide/");
    } else if (message.includes("ai code suggestion")) {
        speak("Fetching AI-generated code suggestions...");
        window.open("https://www.codenewbie.org/");
    }

    // 🔒 Security & Privacy
    else if (message.includes("two factor authentication")) {
        speak("Guiding you on two-factor authentication...");
        window.open("https://www.turnon2fa.com/");
    } else if (message.includes("privacy tips")) {
        speak("Opening online privacy tips...");
        window.open("https://www.privacytools.io/");
    }

    // 💰 Finance & Crypto
    else if (message.includes("convert currency")) {
        speak("Opening a currency converter...");
        window.open("https://www.xe.com/currencyconverter/");
    } else if (message.includes("ethereum price")) {
        speak("Checking Ethereum price...");
        window.open("https://www.coindesk.com/price/ethereum");
    }

    // 🌦️ Weather & Travel
    else if (message.includes("live weather")) {
        speak("Fetching live weather updates...");
        window.open("https://www.weather.com/");
    } else if (message.includes("best travel destinations")) {
        speak("Finding top travel destinations...");
        window.open("https://www.lonelyplanet.com/");
    }

    // 🔄 Daily Utilities
    else if (message.includes("set reminder")) {
        speak("Opening reminders...");
        window.open("ms-settings:reminders");
    } else if (message.includes("random color")) {
        let color = "#" + Math.floor(Math.random()*16777215).toString(16);
        speak(`Here's a random color: ${color}`);
        document.body.style.backgroundColor = color;
    } else if (message.includes("record voice note")) {
        speak("Opening voice recorder...");
        window.open("ms-settings:soundrecorder");
    }


    // 📌 Default Google Search
    else {
        let searchQuery = message.replace(/shipra|shifra/gi, "").trim();
        let finalText = `This is what I found on the internet regarding ${searchQuery}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
    }
}
