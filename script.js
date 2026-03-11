        const commonWords = [
            "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
            "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
            "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
            "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
            "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
            "is", "was", "are", "were", "been", "has", "had", "did", "does", "doing", "done", "being", "having", "getting", "got", "goes", "went", "going", "gone", "made",
            "makes", "making", "taken", "taking", "took", "comes", "came", "coming", "seen", "saw", "seeing", "knows", "knew", "knowing", "thought", "thinking", "thinks", "found", "find", "finding",
            "found", "give", "gave", "given", "giving", "tells", "told", "telling", "becomes", "became", "becoming", "leaves", "left", "leaving", "feels", "felt", "feeling", "seems", "seemed", "seeming",
            "asks", "asked", "asking", "needs", "needed", "needing", "wants", "wanted", "wanting", "uses", "used", "using", "finds", "turns", "turned", "turning", "places", "placed", "placing", "hands", "handed",
            "handing", "lives", "lived", "living", "means", "meant", "meaning", "calls", "called", "calling", "moves", "moved", "moving", "believes", "believed", "believing", "brings", "brought", "bringing", "happens", "happened",
            "happening", "stands", "stood", "standing", "loses", "lost", "losing", "pays", "paid", "paying", "meets", "met", "meeting", "includes", "included", "including", "continues", "continued", "continuing", "changes", "changed",
            "changing", "watches", "watched", "watching", "follows", "followed", "following", "stops", "stopped", "stopping", "creates", "created", "creating", "speaks", "spoke", "spoken", "speaking", "reads", "read", "reading", "allows",
            "allowed", "allowing", "adds", "added", "adding", "spends", "spent", "spending", "grows", "grew", "grown", "growing", "opens", "opened", "opening", "walks", "walked", "walking", "wins", "won", "winning",
            "offers", "offered", "offering", "remembers", "remembered", "remembering", "loves", "loved", "loving", "considers", "considered", "considering", "appears", "appeared", "appearing", "buys", "bought", "buying", "waits", "waited", "waiting",
            "serves", "served", "serving", "dies", "died", "dying", "sends", "sent", "sending", "expects", "expected", "expecting", "builds", "built", "building", "stays", "stayed", "staying", "falls", "fell", "falling",
            "cuts", "cut", "cutting", "reaches", "reached", "reaching", "kills", "killed", "killing", "remains", "remained", "remaining", "suggests", "suggested", "suggesting", "raises", "raised", "raising", "passes", "passed", "passing",
            "sells", "sold", "selling", "requires", "required", "requiring", "reports", "reported", "reporting", "decides", "decided", "deciding", "pulls", "pulled", "pulling", "returns", "returned", "returning", "explains", "explained", "explaining",
            "carries", "carried", "carrying", "develops", "developed", "developing", "hopes", "hoped", "hoping", "drives", "drove", "driven", "driving", "breaks", "broke", "broken", "breaking", "receives", "received", "receiving", "agrees",
            "agreed", "agreeing", "supports", "supported", "supporting", "removes", "removed", "removing", "returns", "returned", "returning", "runs", "ran", "running", "writes", "wrote", "written", "writing", "hears", "heard", "hearing",
            "shows", "showed", "shown", "showing", "lets", "let", "letting", "begins", "began", "begun", "beginning", "helps", "helped", "helping", "talks", "talked", "talking", "plays", "played", "playing"
        ];

        class TypingGame {
            constructor() {
                this.mode = 'words';
                this.wordCount = 10;
                this.timeLimit = null;
                this.currentModeValue = 10;
                this.darkMode = false;
                
                this.isRunning = false;
                this.isFinished = false;
                this.startTime = null;
                this.endTime = null;
                this.timer = null;
                
                this.currentWordIndex = 0;
                this.currentCharIndex = 0;
                this.wordList = [];
                this.typedHistory = [];
                this.keyLog = [];
                
                this.correctChars = 0;
                this.totalChars = 0;
                this.errors = 0;
                
                this.replayData = [];
                this.replayIndex = 0;
                this.replayTimer = null;
                this.isReplaying = false;
                
                this.elements = {
                    themeToggle: document.getElementById('themeToggle'),
                    configBar: document.getElementById('configBar'),
                    wordsWrapper: document.getElementById('wordsWrapper'),
                    hiddenInput: document.getElementById('hiddenInput'),
                    typingArea: document.getElementById('typingArea'),
                    wpm: document.getElementById('wpm'),
                    accuracy: document.getElementById('accuracy'),
                    progress: document.getElementById('progress'),
                    time: document.getElementById('time'),
                    timerStat: document.getElementById('timerStat'),
                    restartBtn: document.getElementById('restartBtn'),
                    resultOverlay: document.getElementById('resultOverlay'),
                    finalWpm: document.getElementById('finalWpm'),
                    finalAccuracy: document.getElementById('finalAccuracy'),
                    finalRaw: document.getElementById('finalRaw'),
                    finalChars: document.getElementById('finalChars'),
                    finalErrors: document.getElementById('finalErrors'),
                    finalConsistency: document.getElementById('finalConsistency'),
                    replayWords: document.getElementById('replayWords'),
                    replayCursor: document.getElementById('replayCursor'),
                    replayProgress: document.getElementById('replayProgress'),
                    replayPlay: document.getElementById('replayPlay'),
                    replayPause: document.getElementById('replayPause'),
                    replayReset: document.getElementById('replayReset'),
                    customTime: document.getElementById('customTime')
                };

                this.init();
            }

            init() {
                this.bindConfig();
                this.bindEvents();
                this.setupTheme();
                this.setupMode();
            }

            setupTheme() {
                const saved = localStorage.getItem('monotype-theme');
                if (saved === 'dark') {
                    this.darkMode = true;
                    document.documentElement.setAttribute('data-theme', 'dark');
                    this.elements.themeToggle.textContent = 'Light';
                }
            }

            toggleTheme() {
                this.darkMode = !this.darkMode;
                if (this.darkMode) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    this.elements.themeToggle.textContent = 'Light';
                    localStorage.setItem('monotype-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    this.elements.themeToggle.textContent = 'Dark';
                    localStorage.setItem('monotype-theme', 'light');
                }
            }

            bindConfig() {
                this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

                const buttons = document.querySelectorAll('.config-btn');
                buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const mode = btn.dataset.mode;
                        const value = parseInt(btn.dataset.value);
                        
                        buttons.forEach(b => {
                            if (b.dataset.mode === mode) b.classList.remove('active');
                        });
                        btn.classList.add('active');
                        
                        this.mode = mode;
                        this.currentModeValue = value;
                        
                        if (mode === 'words') {
                            this.wordCount = value;
                            this.timeLimit = null;
                        } else {
                            this.wordCount = 100;
                            this.timeLimit = value;
                        }
                        
                        this.restart();
                    });
                });

                this.elements.customTime.addEventListener('change', (e) => {
                    const val = parseInt(e.target.value);
                    if (val > 0) {
                        document.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
                        this.mode = 'time';
                        this.timeLimit = val;
                        this.wordCount = 200;
                        this.restart();
                    }
                });
            }

            setupMode() {
                if (this.mode === 'words') {
                    this.wordCount = this.currentModeValue;
                    this.timeLimit = null;
                    this.elements.time.textContent = '-';
                    this.elements.timerStat.style.opacity = '0.3';
                } else {
                    this.wordCount = 100;
                    this.timeLimit = this.currentModeValue;
                    this.elements.time.textContent = this.timeLimit + 's';
                    this.elements.timerStat.style.opacity = '1';
                }
                this.elements.progress.textContent = `0/${this.wordCount}`;
            }

            generateWords() {
                this.wordList = [];
                for (let i = 0; i < this.wordCount; i++) {
                    this.wordList.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
                }
            }

            renderWords() {
                this.elements.wordsWrapper.innerHTML = '';
                this.wordList.forEach((word, index) => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'word entering';
                    wordDiv.style.animationDelay = `${index * 0.02}s`;
                    wordDiv.dataset.index = index;
                    
                    word.split('').forEach((char) => {
                        const charSpan = document.createElement('span');
                        charSpan.className = 'char';
                        charSpan.textContent = char;
                        wordDiv.appendChild(charSpan);
                    });
                    
                    this.elements.wordsWrapper.appendChild(wordDiv);
                });
                
                setTimeout(() => this.updateCursor(), 50);
            }

            bindEvents() {
                this.elements.typingArea.addEventListener('click', () => {
                    this.elements.hiddenInput.focus();
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !this.isFinished) {
                        this.elements.hiddenInput.focus();
                    }
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        this.restart();
                    }
                });

                this.elements.hiddenInput.addEventListener('input', (e) => this.handleInput(e));
                this.elements.hiddenInput.addEventListener('keydown', (e) => this.handleKeydown(e));
                
                this.elements.restartBtn.addEventListener('click', () => this.restart());
                
                this.elements.replayPlay.addEventListener('click', () => this.playReplay());
                this.elements.replayPause.addEventListener('click', () => this.pauseReplay());
                this.elements.replayReset.addEventListener('click', () => this.resetReplay());
            }

            handleInput(e) {
                if (this.isFinished) return;
                
                const value = e.target.value;
                const currentWord = this.wordList[this.currentWordIndex];
                const timestamp = Date.now();
                
                if (!this.isRunning && value.length > 0) {
                    this.start();
                }

                if (value.endsWith(' ')) {
                    if (value.trim().length > 0) {
                        this.logKey(' ', timestamp, 'space');
                        this.currentWordIndex++;
                        this.currentCharIndex = 0;
                        e.target.value = '';
                        
                        if (this.currentWordIndex >= this.wordCount) {
                            this.finish();
                        }
                    }
                    return;
                }

                const prevValue = this.typedHistory[this.currentWordIndex] || '';
                
                if (value.length > prevValue.length) {
                    const char = value[value.length - 1];
                    const isCorrect = char === currentWord[value.length - 1];
                    this.logKey(char, timestamp, isCorrect ? 'correct' : 'incorrect');
                }

                this.typedHistory[this.currentWordIndex] = value;
                this.currentCharIndex = value.length;
                this.updateDisplay(value, currentWord);
                this.updateCursor();
                this.updateStats();
            }

            handleKeydown(e) {
                if (e.key === 'Backspace') {
                    const value = this.elements.hiddenInput.value;
                    if (value.length === 0 && this.currentWordIndex > 0) {
                        e.preventDefault();
                        this.currentWordIndex--;
                        const prevWord = this.wordList[this.currentWordIndex];
                        const prevTyped = this.typedHistory[this.currentWordIndex] || '';
                        this.elements.hiddenInput.value = prevTyped;
                        this.currentCharIndex = prevTyped.length;
                        this.updateDisplay(prevTyped, prevWord);
                        this.updateCursor();
                        this.logKey('backspace', Date.now(), 'backspace');
                    }
                }
            }

            logKey(char, timestamp, type) {
                this.keyLog.push({ char, timestamp, type, wordIndex: this.currentWordIndex });
            }

            updateDisplay(input, target) {
                const wordDiv = this.elements.wordsWrapper.children[this.currentWordIndex];
                if (!wordDiv) return;
                
                const chars = wordDiv.querySelectorAll('.char');
                
                wordDiv.classList.add('active');
                wordDiv.classList.remove('error');
                
                chars.forEach((char, index) => {
                    char.classList.remove('correct', 'incorrect', 'cursor', 'extra');
                    
                    if (index < input.length) {
                        const inputChar = input[index];
                        const targetChar = target[index];
                        
                        if (inputChar === targetChar) {
                            char.classList.add('correct');
                        } else {
                            char.classList.add('incorrect');
                            wordDiv.classList.add('error');
                        }
                    } else if (index < target.length) {
                        char.textContent = target[index];
                    }
                });

                for (let i = input.length; i < target.length; i++) {
                    if (!chars[i]) {
                        const span = document.createElement('span');
                        span.className = 'char';
                        span.textContent = target[i];
                        wordDiv.appendChild(span);
                    }
                }

                if (input.length > target.length) {
                    for (let i = target.length; i < input.length; i++) {
                        const span = document.createElement('span');
                        span.className = 'char extra';
                        span.textContent = input[i];
                        wordDiv.appendChild(span);
                        wordDiv.classList.add('error');
                    }
                }

                for (let i = 0; i < this.currentWordIndex; i++) {
                    const prevWord = this.elements.wordsWrapper.children[i];
                    if (prevWord) {
                        prevWord.classList.remove('active');
                        prevWord.classList.add('completed');
                    }
                }
            }

            updateCursor() {
                document.querySelectorAll('.cursor').forEach(el => el.classList.remove('cursor'));
                
                const wordDiv = this.elements.wordsWrapper.children[this.currentWordIndex];
                if (!wordDiv) return;
                
                const chars = wordDiv.querySelectorAll('.char');
                const targetWord = this.wordList[this.currentWordIndex];
                const input = this.elements.hiddenInput.value;
                
                if (this.currentCharIndex < targetWord.length) {
                    if (chars[this.currentCharIndex]) {
                        chars[this.currentCharIndex].classList.add('cursor');
                    }
                } else {
                    const extraIndex = this.currentCharIndex - targetWord.length;
                    if (extraIndex < chars.length - targetWord.length) {
                        chars[targetWord.length + extraIndex]?.classList.add('cursor');
                    } else {
                        const cursor = document.createElement('span');
                        cursor.className = 'char cursor extra';
                        cursor.textContent = input[this.currentCharIndex - 1] || '';
                        wordDiv.appendChild(cursor);
                    }
                }
            }

            start() {
                this.isRunning = true;
                this.startTime = Date.now();
                
                if (this.timeLimit) {
                    this.elements.time.textContent = this.timeLimit + 's';
                    let timeLeft = this.timeLimit;
                    
                    this.timer = setInterval(() => {
                        timeLeft--;
                        this.elements.time.textContent = timeLeft + 's';
                        
                        if (timeLeft <= 0) {
                            this.finish();
                        }
                    }, 1000);
                }
            }

            updateStats() {
                if (!this.startTime) return;
                
                const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
                if (timeElapsed === 0) return;
                
                const wordsTyped = this.currentWordIndex;
                const wpm = Math.round(wordsTyped / timeElapsed);
                
                let correct = 0;
                let total = 0;
                
                this.typedHistory.forEach((typed, idx) => {
                    const target = this.wordList[idx];
                    for (let i = 0; i < typed.length; i++) {
                        total++;
                        if (typed[i] === target[i]) correct++;
                    }
                });
                
                const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
                
                this.elements.wpm.textContent = wpm;
                this.elements.accuracy.textContent = accuracy + '%';
                this.elements.progress.textContent = `${this.currentWordIndex}/${this.wordCount}`;
                
                if (this.elements.wpm.textContent !== wpm.toString()) {
                    this.elements.wpm.classList.add('update');
                    setTimeout(() => this.elements.wpm.classList.remove('update'), 300);
                }
            }

            finish() {
                if (this.isFinished) return;
                this.isFinished = true;
                this.isRunning = false;
                this.endTime = Date.now();
                clearInterval(this.timer);
                
                this.calculateFinalStats();
                this.prepareReplay();
                this.showResults();
            }

            calculateFinalStats() {
                const timeMinutes = (this.endTime - this.startTime) / 1000 / 60;
                const correctWords = this.typedHistory.filter((typed, idx) => {
                    return typed === this.wordList[idx];
                }).length;
                const wpm = Math.round(correctWords / timeMinutes);
                
                let correctChars = 0;
                let totalChars = 0;
                let errors = 0;
                
                this.typedHistory.forEach((typed, idx) => {
                    const target = this.wordList[idx];
                    for (let i = 0; i < Math.max(typed?.length || 0, target.length); i++) {
                        totalChars++;
                        if (typed && typed[i] === target[i]) {
                            correctChars++;
                        } else {
                            errors++;
                        }
                    }
                });
                
                const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
                const rawWPM = Math.round((this.currentWordIndex / timeMinutes));
                
                this.elements.finalWpm.textContent = wpm;
                this.elements.finalAccuracy.textContent = accuracy + '%';
                this.elements.finalRaw.textContent = rawWPM;
                this.elements.finalChars.textContent = correctChars;
                this.elements.finalErrors.textContent = errors;
                
                const consistency = this.calculateConsistency();
                this.elements.finalConsistency.textContent = consistency + '%';
            }

            calculateConsistency() {
                if (this.keyLog.length < 2) return 100;
                
                const intervals = [];
                for (let i = 1; i < this.keyLog.length; i++) {
                    if (this.keyLog[i].type !== 'backspace' && this.keyLog[i-1].type !== 'backspace') {
                        intervals.push(this.keyLog[i].timestamp - this.keyLog[i-1].timestamp);
                    }
                }
                
                if (intervals.length < 2) return 100;
                
                const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
                const variance = intervals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / intervals.length;
                const stdDev = Math.sqrt(variance);
                const cv = (stdDev / avg) * 100;
                
                return Math.max(0, Math.round(100 - Math.min(cv, 100)));
            }

            prepareReplay() {
                this.replayData = this.keyLog.map((log, index) => ({
                    ...log,
                    duration: index < this.keyLog.length - 1 ? 
                        this.keyLog[index + 1].timestamp - log.timestamp : 100
                }));
                
                this.renderReplayWords();
            }

            renderReplayWords() {
                this.elements.replayWords.innerHTML = '';
                
                this.wordList.forEach((word, wordIdx) => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'replay-word';
                    wordDiv.dataset.index = wordIdx;
                    
                    const typed = this.typedHistory[wordIdx] || '';
                    
                    for (let i = 0; i < Math.max(word.length, typed.length); i++) {
                        const charSpan = document.createElement('span');
                        charSpan.className = 'replay-char';
                        charSpan.dataset.word = wordIdx;
                        charSpan.dataset.char = i;
                        
                        if (i < typed.length) {
                            if (typed[i] === word[i]) {
                                charSpan.classList.add('correct');
                                charSpan.textContent = typed[i];
                            } else if (i < word.length) {
                                charSpan.classList.add('incorrect');
                                charSpan.textContent = typed[i] || '';
                            } else {
                                charSpan.classList.add('incorrect');
                                charSpan.textContent = typed[i];
                            }
                        } else if (i < word.length) {
                            charSpan.classList.add('missing');
                            charSpan.textContent = word[i];
                        }
                        
                        wordDiv.appendChild(charSpan);
                    }
                    
                    this.elements.replayWords.appendChild(wordDiv);
                });
            }

            playReplay() {
                if (this.isReplaying) return;
                this.isReplaying = true;
                
                this.elements.replayPlay.disabled = true;
                this.elements.replayPause.disabled = false;
                
                const startTime = this.replayData[0]?.timestamp || Date.now();
                
                const step = () => {
                    if (!this.isReplaying || this.replayIndex >= this.replayData.length) {
                        this.pauseReplay();
                        return;
                    }
                    
                    const log = this.replayData[this.replayIndex];
                    const progress = ((log.timestamp - startTime) / (this.endTime - startTime)) * 100;
                    this.elements.replayProgress.style.width = progress + '%';
                    
                    let charIndex = 0;
                    for (let i = 0; i <= this.replayIndex; i++) {
                        if (this.replayData[i].wordIndex === log.wordIndex && 
                            this.replayData[i].type !== 'space' && 
                            this.replayData[i].type !== 'backspace') {
                            charIndex++;
                        }
                    }
                    
                    const char = document.querySelector(
                        `.replay-char[data-word="${log.wordIndex}"][data-char="${charIndex - 1}"]`
                    );
                    
                    if (char) {
                        const rect = char.getBoundingClientRect();
                        const containerRect = this.elements.replayWords.getBoundingClientRect();
                        this.elements.replayCursor.style.left = (rect.left - containerRect.left + rect.width) + 'px';
                        this.elements.replayCursor.style.top = (rect.top - containerRect.top) + 'px';
                        this.elements.replayCursor.style.height = rect.height + 'px';
                    }
                    
                    this.replayIndex++;
                    
                    const nextLog = this.replayData[this.replayIndex];
                    if (nextLog) {
                        const delay = nextLog.timestamp - log.timestamp;
                        this.replayTimer = setTimeout(step, Math.min(delay, 50));
                    } else {
                        setTimeout(() => this.pauseReplay(), 300);
                    }
                };
                
                step();
            }

            pauseReplay() {
                this.isReplaying = false;
                clearTimeout(this.replayTimer);
                this.elements.replayPlay.disabled = false;
                this.elements.replayPause.disabled = true;
            }

            resetReplay() {
                this.pauseReplay();
                this.replayIndex = 0;
                this.elements.replayProgress.style.width = '0%';
                this.elements.replayCursor.style.left = '0px';
                this.elements.replayCursor.style.top = '0px';
            }

            showResults() {
                this.elements.resultOverlay.classList.add('show');
                this.elements.restartBtn.classList.add('visible');
            }

            closeResults() {
                this.elements.resultOverlay.classList.remove('show');
            }

            restart() {
                this.isRunning = false;
                this.isFinished = false;
                this.isReplaying = false;
                this.startTime = null;
                this.endTime = null;
                this.currentWordIndex = 0;
                this.currentCharIndex = 0;
                this.typedHistory = [];
                this.keyLog = [];
                this.replayData = [];
                this.replayIndex = 0;
                
                clearInterval(this.timer);
                clearTimeout(this.replayTimer);
                
                this.elements.hiddenInput.value = '';
                this.elements.wpm.textContent = '0';
                this.elements.accuracy.textContent = '100%';
                this.elements.restartBtn.classList.remove('visible');
                this.elements.resultOverlay.classList.remove('show');
                this.elements.replayProgress.style.width = '0%';
                
                this.setupMode();
                this.generateWords();
                this.renderWords();
                this.elements.hiddenInput.focus();
            }
        }

        const game = new TypingGame();