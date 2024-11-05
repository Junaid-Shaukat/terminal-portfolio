'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import confetti from 'canvas-confetti'
import { Typewriter } from 'react-simple-typewriter'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Globe, ArrowRightLeft } from 'lucide-react'

const COMMANDS = {
  help: 'Shows available commands',
  about: 'Displays information about Junaid',
  skills: 'Lists Junaid\'s technical skills',
  projects: 'Shows Junaid\'s recent projects',
  contact: 'Displays Junaid\'s contact information',
  clear: 'Clears the terminal',
  game: 'Play a fun guessing game',
  weather: 'Check the current weather',
  joke: 'Tells a random programming joke',
  theme: 'Changes the color theme',
  matrix: 'Toggles the Matrix effect',
  quote: 'Displays an inspirational quote',
  certifications: 'Lists professional certifications',
  github: 'Opens Junaid\'s GitHub profile',
  linkedin: 'Opens Junaid\'s LinkedIn profile',
  twitter: 'Opens Junaid\'s Twitter profile',
  website: 'Opens Junaid\'s personal website',
}

const ABOUT_ME = [
  '🚀 Innovative Software Engineer with a passion for cutting-edge web applications',
  '🌎 Based in Pakistan, pk',
  '💻 Specialized in Next.js, MERN, and cloud technologies',
  '🎓 B.S in Computer Science from University of Education, Lahore (continue...)',
  '🏆 1+ years of experience in developing scalable and efficient software solutions',
  '🎨 Expert in UI/UX design and accessibility',
  '📚 Lifelong learner, constantly adapting to new technologies',
  '🌐 Fluent in English, URDU, and JavaScript 😉',
  '🔧 Problem solver with a keen eye for optimization',
  '🤝 Strong communicator and team player',
]

const SKILLS = [
  { name: 'React', logo: 'https://cdn.worldvectorlogo.com/logos/react-1.svg' },
  { name: 'Node.js', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
  { name: 'TypeScript', logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
  { name: 'JavaScript', logo: 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg' },
  { name: 'Next.js', logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
  { name: 'C++', logo: 'https://cdn.worldvectorlogo.com/logos/c.svg' },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' },
]

const PROJECTS = [
  {
    name: '📚 UE READERS CLUB',
    description: 'AI-powered chat application with real-time translation capabilities',
    link: 'https://ue-readers-club.vercel.app/',
    technologies: ['Node.js', 'Express.js', 'Next.js', 'WebSocket', 'Clerk']
  },
  {
    name: '🚀 Revise-Deps',
    description: 'Revise-Deps is an npm package designed to help you manage your project dependencies. It allows you to easily update, add, and remove dependencies from your package.json file.',
    link: 'https://www.npmjs.com/package/revise-deps',
    technologies: ['Node.js', 'Express.js', 'npm', 'JavaScript']
  },
  {
    name: '👨‍💻  Crypto Area',
    description: 'Real-time cryptocurrency tracker and showing dynamic data of cryptocurrencies.',
    link: 'https://cryptoarea.netlify.app/',
    technologies: ['React', 'Firebase', 'CoinGecko Api', 'REST Api']
  },
  {
    name: '😋  Food App',
    description: 'Food App is a food delivery app that allows users to order food from their favorite restaurants and have it delivered to their doorstep.',
    link: 'https://github.com/Junaid-Shaukat/tomato-app',
    technologies: ['React', 'Stripe', 'MERN', 'REST Api']
  }
]

const CONTACT = [
  { icon: '📧', text: 'Email: junaidshaukat546@gmail.com' },
  { icon: '🐙', text: 'GitHub: github.com/Junaid-Shaukat' },
  { icon: '💼', text: 'LinkedIn: linkedin.com/in/junaiddshaukat' },
  { icon: '🐦', text: 'Twitter: x.com/junaiddshaukat' },
  { icon: '🌐', text: 'Personal Website: junaidshaukat.tech' },
]

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why did the developer go broke? Because he used up all his cache!",
  "Why do programmers hate nature? It has too many bugs!",
  "What's a programmer's favorite hangout place? The Foo Bar!",
  "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25!"
]

const THEMES = [
  { name: 'Matrix', bg: 'bg-black', text: 'text-green-400', highlight: 'text-green-200', code: 'text-green-300' },
  { name: 'Cyberpunk', bg: 'bg-purple-900', text: 'text-yellow-300', highlight: 'text-pink-300', code: 'text-blue-300' },
  { name: 'Midnight', bg: 'bg-blue-900', text: 'text-cyan-400', highlight: 'text-yellow-300', code: 'text-pink-300' },
  { name: 'Hacker', bg: 'bg-gray-900', text: 'text-red-500', highlight: 'text-green-500', code: 'text-yellow-300' },
]

const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The best way to predict the future is to invent it. - Alan Kay"
]

const CERTIFICATIONS = [
  { name: "Postman Student Expert", issuer: "Postman", year: 2024, logo: 'https://cdn.worldvectorlogo.com/logos/postman.svg' },
  { name: "Frontend Engineer Certification", issuer: "Hackerrank", year: 2024, logo: 'https://cdn.worldvectorlogo.com/logos/hackerrank-4.svg' },
  { name: "Full stack Developer", issuer: "Udemy", year: 2024, logo: 'https://cdn.worldvectorlogo.com/logos/udemy-wordmark-1.svg' },
  { name: "Google Soft Skills Certification", issuer: "Google", year: 2024, logo: 'https://cdn.worldvectorlogo.com/logos/google-g-2015.svg' },
]

export default function JunaidUltimateCoolPortfolio() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState(['Welcome to Junaid Shaukat\'s interactive portfolio! Type "help" or click a button below to get started.'])
  const [theme, setTheme] = useState(THEMES[0])
  const [matrixActive, setMatrixActive] = useState(true)
  const [gameActive, setGameActive] = useState(false)
  const [gameNumber, setGameNumber] = useState(0)
  const [guiMode, setGuiMode] = useState(false)
  const endOfOutputRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    endOfOutputRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  useEffect(() => {
    if (matrixActive) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const fontSize = 10
      const columns = canvas.width / fontSize

      const drops = []
      for (let x = 0; x < columns; x++) {
        drops[x] = 1
      }

      const draw = () => {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = '#0F0'
        context.font = fontSize + 'px monospace'
        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length))
          context.fillText(text, i * fontSize, drops[i] * fontSize)
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      const interval = setInterval(draw, 33)
      return () => clearInterval(interval)
    }
  }, [matrixActive])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(input)
    setInput('')
  }

  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    setOutput(prev => [...prev, `<span class="${theme.text}">$</span> <span class="${theme.highlight}">${cmd}</span>`])

    if (gameActive) {
      handleGameGuess(command)
      return
    }

    switch (command) {
      case 'help':
        displayHelp()
        break
      case 'about':
        displayAbout()
        break
      case 'skills':
        displaySkills()
        break
      case 'projects':
        displayProjects()
        break
      case 'contact':
        displayContact()
        break
      case 'clear':
        clearTerminal()
        break
      case 'game':
        startGame()
        break
      case 'weather':
        displayWeather()
        break
      case 'joke':
        tellJoke()
        break
      case 'theme':
        changeTheme()
        break
      case 'matrix':
        toggleMatrix()
        break
      case 'quote':
        displayQuote()
        break
      case 'certifications':
        displayCertifications()
        break
      case 'github':
        window.open('https://github.com/Junaid-Shaukat', '_blank')
        setOutput(prev => [...prev, `<span class="${theme.text}">Opening GitHub profile...</span>`])
        break
      case 'linkedin':
        window.open('https://linkedin.com/in/junaiddshaukat', '_blank')
        setOutput(prev => [...prev, `<span class="${theme.text}">Opening LinkedIn profile...</span>`])
        break
      case 'twitter':
        window.open('https://x.com/junaiddshaukat', '_blank')
        setOutput(prev => [...prev, `<span class="${theme.text}">Opening Twitter profile...</span>`])
        break
      case 'website':
        window.open('https://junaidshaukat.tech', '_blank')
        setOutput(prev => [...prev, `<span class="${theme.text}">Opening personal website...</span>`])
        break
      default:
        setOutput(prev => [...prev, `<span class="text-red-500">Oops! "${cmd}" is not a recognized command. Type "help" to see what I can do!</span>`])
    }
  }

  const displayHelp = () => {
    setOutput(prev => [
      ...prev,
      `<span class="${theme.text}">Here's what I can do:</span>`,
      ...Object.entries(COMMANDS).map(([cmd, desc]) => `  <span class="${theme.highlight}">${cmd}</span> - <span class="${theme.code}">${desc}</span>`)
    ])
  }

  const displayAbout = () => {
    setOutput(prev => [...prev, ...ABOUT_ME.map(line => `<span class="${theme.text}">${line}</span>`)])
  }

  const displaySkills = () => {
    setOutput(prev => [
      ...prev,
      `<span class="${theme.text}">Junaid's Super Powers:</span>`,
      ...SKILLS.map(skill => 
        `<div class="flex items-center mt-1">
          <span class="${theme.highlight} w-40">${skill.name}</span>
        </div>`
      )
    ])
  }

  const displayProjects = () => {
    setOutput(prev => [
      ...prev,
      `<span class="${theme.text}">Junaid's Cool Projects:</span>`,
      ...PROJECTS.map(project => 
        `<div class="mt-2">
          <span class="${theme.highlight} text-lg">${project.name}</span>
          <p class="${theme.code}">${project.description}</p>
          <p class="${theme.text}">Technologies: ${project.technologies.join(', ')}</p>
          <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="${theme.text} underline">Check it out!</a>
        </div>`
      )
    ])
  }

  const displayContact = () => {
    setOutput(prev => [...prev, ...CONTACT.map(item => `<span class="${theme.text}">${item.icon} ${item.text}</span>`)])
  }

  const clearTerminal = () => {
    setOutput([])
  }

  const startGame = () => {
    setGameActive(true)
    setGameNumber(Math.floor(Math.random() * 100) + 1)
    setOutput(prev => [
      ...prev,
      `<span class="${theme.text}">Let's play a guessing game! I'm thinking of a number between 1 and 100.</span>`,
      `<span class="${theme.text}">Type your guess as a number, like this: 50</span>`
    ])
  }

  const handleGameGuess = (guess: string) => {
    const guessNum = parseInt(guess)
    if (isNaN(guessNum)) {
      setOutput(prev => [...prev, `<span class="text-red-500">Please enter a valid number!</span>`])
      return
    }
    if (guessNum === gameNumber) {
      confetti()
      setOutput(prev => [...prev, `<span class="text-green-500">Congratulations! You guessed it! The number was ${gameNumber}.</span>`])
      setGameActive(false)
    } else if (guessNum < gameNumber) {
      setOutput(prev => [...prev, `<span class="${theme.highlight}">Too low! Try a higher number.</span>`])
    } else {
      setOutput(prev => [...prev, `<span class="${theme.highlight}">Too high! Try a lower number.</span>`])
    }
  }

  const displayWeather = () => {
    setOutput(prev =>    [
      ...prev,
      `<span class="${theme.text}">Fetching the weather...</span>`,
      `<span class="${theme.highlight}">☀️ It's a beautiful day for coding!</span>`,
      `<span class="${theme.code}">Temperature: 72°F (22°C)</span>`,
      `<span class="${theme.code}">Condition: Sunny with a chance of bug fixes</span>`
    ])
  }

  const tellJoke = () => {
    const joke = JOKES[Math.floor(Math.random() * JOKES.length)]
    setOutput(prev => [...prev, `<span class="${theme.highlight}">${joke}</span>`])
  }

  const changeTheme = () => {
    const newTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
    setTheme(newTheme)
    setOutput(prev => [...prev, `<span class="${newTheme.text}">Theme changed to ${newTheme.name}!</span>`])
  }

  const toggleMatrix = () => {
    setMatrixActive(!matrixActive)
    setOutput(prev => [...prev, `<span class="${theme.text}">Matrix mode ${matrixActive ? 'deactivated' : 'activated'}!</span>`])
  }

  const displayQuote = () => {
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    setOutput(prev => [...prev, `<span class="${theme.code}">"${quote}"</span>`])
  }

  const displayCertifications = () => {
    setOutput(prev => [
      ...prev,
      `<span class="${theme.text}">Professional Certifications:</span>`,
      ...CERTIFICATIONS.map(cert => 
        `<div class="mt-2">
          <span class="${theme.highlight}">${cert.name}</span>
          <span class="${theme.code}"> - ${cert.issuer} (${cert.year})</span>
        </div>`
      )
    ])
  }

  const renderTerminal = () => (
    <motion.div 
      className={`${theme.bg} p-4 rounded-lg shadow-lg border ${theme.text} border-opacity-50`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`text-2xl font-bold ${theme.text}`}>
          <Typewriter
            words={['Junaid Shaukat', 'Software Engineer', 'Problem Solver', 'Innovator']}
            loop={0}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </div>
      <div className="h-[60vh] overflow-auto mb-4 custom-scrollbar">
        <AnimatePresence>
          {output.map((line, index) => (
            <motion.pre 
              key={index} 
              className="whitespace-pre-wrap" 
              dangerouslySetInnerHTML={{ __html: line }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            ></motion.pre>
          ))}
        </AnimatePresence>
        <div ref={endOfOutputRef} />
      </div>
      <form onSubmit={handleInputSubmit} className="flex items-center">
        <span className={`mr-2 ${theme.text}`}>$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={`flex-grow bg-transparent focus:outline-none ${theme.text}`}
          placeholder="Type a command or click a button below"
          autoFocus
        />
      </form>
    </motion.div>
  )

  const renderGui = () => (
    <motion.div 
      className={`${theme.bg} p-4 rounded-lg shadow-lg ${theme.text}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4 bg-gray-800">
          <TabsTrigger value="about" className="data-[state=active]:bg-gray-700">About</TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-gray-700">Skills</TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-gray-700">Projects</TabsTrigger>
          <TabsTrigger value="certifications" className="data-[state=active]:bg-gray-700">Certifications</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-gray-700">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className={theme.highlight}>About Junaid Shaukat</CardTitle>
            </CardHeader>
            <CardContent>
              {ABOUT_ME.map((line, index) => (
                <p key={index} className={`${theme.text} mb-2`}>{line}</p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className={theme.highlight}>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SKILLS.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src={skill.logo} alt={skill.name} width={64} height={64} className="mb-2" />
                    <span className={theme.text}>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className={theme.highlight}>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme.text} mb-2`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${theme.code} hover:underline`}>View Project</a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="certifications">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className={theme.highlight}>Professional Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CERTIFICATIONS.map((cert, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col items-center text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src={cert.logo} alt={cert.name} width={64} height={64} className="mb-2" />
                    <span className={`${theme.highlight} font-semibold`}>{cert.name}</span>
                    <span className={theme.text}>{cert.issuer}</span>
                    <span className={theme.code}>{cert.year}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className={theme.highlight}>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              {CONTACT.map((item, index) => (
                <p key={index} className={`${theme.text} mb-2`}>{item.icon} {item.text}</p>
              ))}
              <div className="flex justify-center space-x-4 mt-4">
                <motion.a href="https://github.com/Junaid-Shaukat" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Github className={theme.text} />
                </motion.a>
                <motion.a href="https://linkedin.com/in/junaiddshaukat" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Linkedin className={theme.text} />
                </motion.a>
                <motion.a href="https://x.com/junaiddshaukat" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Twitter className={theme.text} />
                </motion.a>
                <motion.a href="https://junaidshaukat.tech" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Globe className={theme.text} />
                </motion.a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )

  return (
    <TooltipProvider>
      <div className={`min-h-screen bg-black ${theme.bg} p-4 font-mono relative overflow-hidden`}>
        {matrixActive && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-2xl font-bold ${theme.highlight}`}>Muhammad Junaid Shaukat</h1>
            <div className="flex items-center bg-slate-700 px-3 py-2 rounded-2xl space-x-4">
      <button
        onClick={() => setGuiMode(false)}
        className={`text-sm font-medium transition-colors ${
          !guiMode ? 'text-green-500' : 'text-gray-300 hover:text-white'
        }`}
        aria-pressed={!guiMode}
      >
        Terminal
      </button>
      <ArrowRightLeft className='text-white' />
      <button
        onClick={() => setGuiMode(true)}
        className={`text-sm font-medium transition-colors ${
          guiMode ? 'text-green-500' : 'text-gray-300 hover:text-white'
        }`}
        aria-pressed={guiMode}
      >
        GUI
      </button>
    </div>
          </div>
          {guiMode ? renderGui() : renderTerminal()}
          {!guiMode && (
            <div className="mt-4 text-center space-x-2 flex flex-wrap justify-center">
              {Object.keys(COMMANDS).map(cmd => (
                <Tooltip key={cmd}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => processCommand(cmd)}
                      className={`${theme.bg} hover:bg-opacity-80 ${theme.text} border border-current m-1 transition-all duration-300 transform hover:scale-105`}
                    >
                      {cmd}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{COMMANDS[cmd]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </div>
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: ${theme.bg};
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: ${theme.highlight};
            border-radius: 4px;
          }
          body {
            background-color: black;
            color: ${theme.text};
          }
        `}</style>
      </div>
    </TooltipProvider>
  )
}