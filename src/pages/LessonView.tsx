import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Play, RotateCcw } from "lucide-react";
import mascot from "@/assets/mascot.png";

const steps = [
  {
    story: `Hey there, future coder! I'm Py the Python 🐍 — your coding buddy! Today is a HUGE day. You're going to write your very first line of code! Every expert coder in the world — the people who made Minecraft, YouTube, and TikTok — they ALL started exactly where you are now. Ready? Let's gooooo! 🚀`,
  },
  {
    story: `In Python, we use something called \`print()\` to make the computer talk! It's like giving the computer a megaphone 📢. Whatever you put inside the parentheses and quotes, the computer will say it out loud!`,
  },
  {
    story: `Try typing this in the code editor below:\n\n\`print("Hello, World!")\`\n\nThen click "Run Code" to see what happens! 🎉`,
    interactive: true,
  },
];

const challenges = [
  { difficulty: "Easy", color: "bg-success", emoji: "🟢", task: "Print your name using Python!" },
  { difficulty: "Medium", color: "bg-accent", emoji: "🟡", task: "Print your name AND your age on separate lines!" },
  { difficulty: "Hard", color: "bg-destructive", emoji: "🔴", task: "Print a box made of stars around your name!" },
];

const LessonView = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState('# Write your Python code here!\nprint("Hello, World!")');
  const [output, setOutput] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);

  const handleRunCode = () => {
    // Simple mock Python runner
    const printMatch = code.match(/print\(["'](.+?)["']\)/g);
    if (printMatch) {
      const results = printMatch.map((m) => {
        const inner = m.match(/print\(["'](.+?)["']\)/);
        return inner ? inner[1] : "";
      });
      setOutput(results.join("\n"));
    } else {
      setOutput("Hmm, try using print() with quotes inside! 🤔");
    }
  };

  const step = steps[currentStep];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/lessons")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lessons
        </button>
        <div className="flex items-center gap-2 bg-card rounded-full px-3 py-1 border border-border">
          <span className="text-primary font-display font-bold text-sm">Module 1</span>
        </div>
      </div>

      {/* Lesson Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-bold">📖 STORY</span>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1}/{steps.length}
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome to Python! 👋</h1>
        {/* Step dots */}
        <div className="flex gap-1.5 mt-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentStep ? "w-8 bg-primary" : i < currentStep ? "w-2 bg-secondary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Story Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-2xl p-6 border border-border"
      >
        <div className="flex gap-4">
          <img src={mascot} alt="Py" className="w-12 h-12 animate-float flex-shrink-0" />
          <div>
            <p className="text-xs text-primary font-bold mb-2">Py the Python says...</p>
            <p className="text-foreground leading-relaxed whitespace-pre-line">{step.story}</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl text-sm font-semibold text-foreground disabled:opacity-30 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-sm text-muted-foreground">
          {currentStep + 1}/{steps.length}
        </span>
        <button
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-display font-bold disabled:opacity-30 hover:bg-primary/90 transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Code Editor */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="font-display font-bold text-sm text-foreground">🧱 Code Editor</span>
          <div className="flex gap-2">
            <button
              onClick={() => { setCode(""); setOutput(""); }}
              className="flex items-center gap-1.5 bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
            <button
              onClick={handleRunCode}
              className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-lg text-xs font-display font-bold hover:bg-secondary/90 transition-colors"
            >
              <Play className="w-3 h-3" /> Run Code
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 divide-x divide-border">
          <div className="p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 bg-transparent font-mono text-sm text-foreground focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
          <div className="p-4 bg-muted/30">
            <p className="text-xs text-muted-foreground mb-2 font-bold">Output:</p>
            <pre className="font-mono text-sm text-success min-h-[120px]">
              {output || "Click 'Run Code' to see your output here! 🚀"}
            </pre>
          </div>
        </div>
      </div>

      {/* Practice Challenge */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/30">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🎯</span>
          <h3 className="font-display text-lg font-bold text-foreground">Practice Challenge</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Choose difficulty:</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {challenges.map((c, i) => (
            <button
              key={c.difficulty}
              onClick={() => setSelectedDifficulty(i)}
              className={`py-2.5 rounded-xl text-sm font-display font-bold border transition-all ${
                selectedDifficulty === i
                  ? `${c.color} text-background border-transparent`
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
            >
              {c.emoji} {c.difficulty}
            </button>
          ))}
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <h4 className="font-display font-bold text-foreground text-lg mb-1">
            {challenges[selectedDifficulty].task}
          </h4>
          <p className="text-xs text-muted-foreground">
            Use the code editor above to complete this challenge! Earn{" "}
            <span className="text-accent font-bold">+{(selectedDifficulty + 1) * 20} XP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
