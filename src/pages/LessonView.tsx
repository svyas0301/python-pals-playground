import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Play, RotateCcw, Sparkles, Trophy, Lock, Star, Zap } from "lucide-react";
import mascot from "@/assets/mascot.png";

type FlowStep = "intro" | "mission" | "code" | "success" | "xp" | "bonus" | "badge" | "next";

const FLOW_ORDER: FlowStep[] = ["intro", "mission", "code", "success", "xp", "bonus", "badge", "next"];

const LessonView = () => {
  const navigate = useNavigate();
  const [flowIndex, setFlowIndex] = useState(0);
  const [code, setCode] = useState('# Type your code here!\nprint("Hello, World!")');
  const [output, setOutput] = useState("");
  const [codeCorrect, setCodeCorrect] = useState(false);
  const [bonusCode, setBonusCode] = useState('# Bonus: Print your name!\nprint("Your Name")');
  const [bonusOutput, setBonusOutput] = useState("");
  const [bonusDone, setBonusDone] = useState(false);
  const [xpAnimated, setXpAnimated] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStep = FLOW_ORDER[flowIndex];

  const advance = () => {
    if (flowIndex < FLOW_ORDER.length - 1) setFlowIndex((i) => i + 1);
  };

  const handleRunCode = () => {
    const printMatch = code.match(/print\(["'](.+?)["']\)/g);
    if (printMatch) {
      const results = printMatch.map((m) => {
        const inner = m.match(/print\(["'](.+?)["']\)/);
        return inner ? inner[1] : "";
      });
      setOutput(results.join("\n"));
      setCodeCorrect(true);
    } else {
      setOutput("Hmm, try using print() with quotes inside! 🤔");
      setCodeCorrect(false);
    }
  };

  const handleRunBonus = () => {
    const printMatch = bonusCode.match(/print\(["'](.+?)["']\)/g);
    if (printMatch) {
      const results = printMatch.map((m) => {
        const inner = m.match(/print\(["'](.+?)["']\)/);
        return inner ? inner[1] : "";
      });
      setBonusOutput(results.join("\n"));
      setBonusDone(true);
    } else {
      setBonusOutput("Try using print() with your name in quotes! 🤔");
    }
  };

  // XP counter animation
  useEffect(() => {
    if (currentStep === "xp") {
      setXpAnimated(0);
      const target = 50;
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setXpAnimated(current);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Confetti on success
  useEffect(() => {
    if (currentStep === "success") {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/lessons")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lessons
        </button>
        <div className="flex items-center gap-1.5">
          {FLOW_ORDER.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === flowIndex ? "w-8 bg-primary" : i < flowIndex ? "w-3 bg-secondary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ===== 1. PY INTRO ===== */}
        {currentStep === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            {/* Mascot bounce in */}
            <div className="flex justify-center">
              <motion.img
                src={mascot}
                alt="Py the Python"
                className="w-24 h-24"
                initial={{ scale: 0, rotate: -30, y: -60 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
              />
            </div>

            {/* Speech bubble with typewriter feel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-5 border border-border relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
              <p className="text-xs text-primary font-bold mb-2">🐍 Py says...</p>
              <motion.p
                className="text-foreground text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Hey future coder! 🎉 Today you'll write your <span className="text-primary font-bold">very first line of code!</span>
              </motion.p>
            </motion.div>

            {/* Animated "What is Programming?" card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, type: "spring" }}
              className="bg-card rounded-2xl border border-primary/30 overflow-hidden"
            >
              <div className="bg-primary/15 px-4 py-2.5 flex items-center gap-2">
                <motion.span
                  initial={{ rotate: -20 }}
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="text-lg"
                >📖</motion.span>
                <span className="text-primary font-display font-bold text-sm">What is Programming?</span>
              </div>
              <div className="p-4 space-y-3">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-foreground font-bold">Programming</span> means giving instructions to a computer — like telling a friend what to do, but in a special language!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="flex items-center gap-2 flex-wrap"
                >
                  {["Google", "Netflix", "Instagram", "Roblox"].map((app, i) => (
                    <motion.span
                      key={app}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.8 + i * 0.15, type: "spring", bounce: 0.5 }}
                      className="bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-bold"
                    >
                      {app}
                    </motion.span>
                  ))}
                  <span className="text-xs text-muted-foreground">all use Python! 🐍</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Animated analogy card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="bg-card rounded-2xl border border-accent/30 overflow-hidden"
            >
              <div className="bg-accent/15 px-4 py-2.5 flex items-center gap-2">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ delay: 2.2, duration: 0.6, repeat: 1 }}
                  className="text-lg"
                >💭</motion.span>
                <span className="text-accent font-display font-bold text-sm">Think of it like...</span>
              </div>
              <div className="p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-muted-foreground">Making a sandwich 🥪:</p>
                  <div className="flex flex-wrap gap-2">
                    {["1. Get bread 🍞", "2. Spread butter 🧈", "3. Add cheese 🧀", "4. Done! ✅"].map((step, i) => (
                      <motion.span
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.4 + i * 0.2 }}
                        className="bg-muted px-3 py-1.5 rounded-lg text-xs font-mono text-foreground"
                      >
                        {step}
                      </motion.span>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.2 }}
                    className="text-sm text-secondary font-bold pt-1"
                  >
                    Code = steps for a computer to follow! 🖥️
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4 }}
              className="flex justify-center pt-2"
            >
              <button
                onClick={advance}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors text-lg animate-pulse-glow"
              >
                I'm Ready! 💪
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ===== 2. MISSION + CODE (combined) ===== */}
        {(currentStep === "mission" || currentStep === "code") && (
          <motion.div
            key="mission-code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Compact Mission Banner */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/10 rounded-xl p-4 border border-primary/30 flex items-center gap-4">
              <motion.img
                src={mascot}
                alt="Py"
                className="w-12 h-12 flex-shrink-0"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold">
                    <Sparkles className="w-3 h-3" /> MISSION
                  </span>
                  <div className="flex items-center gap-1 bg-card px-2 py-0.5 rounded-full border border-border text-xs">
                    <Zap className="w-3 h-3 text-accent" />
                    <span className="text-accent font-bold">+50 XP</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono text-xs">print()</code> to make the computer say <span className="text-accent font-bold">"Hello, World!"</span>
                </p>
              </div>
            </div>

            {/* Target Output */}
            <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
              <span className="text-xs font-bold text-destructive">🎯 TARGET OUTPUT</span>
              <code className="font-mono text-sm text-secondary">Hello, World!</code>
            </div>

            {/* Code Editor */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                <span className="font-display font-bold text-sm text-foreground">💻 Your Code</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setCode(""); setOutput(""); setCodeCorrect(false); }}
                    className="flex items-center gap-1.5 bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                  <button
                    onClick={handleRunCode}
                    className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-lg text-xs font-display font-bold hover:bg-secondary/90 transition-colors"
                  >
                    <Play className="w-3 h-3" /> Run Code ▶
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 divide-x divide-border">
                <div className="p-3">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-28 bg-transparent font-mono text-sm text-foreground focus:outline-none resize-none"
                    spellCheck={false}
                    placeholder='print("Hello, World!")'
                  />
                </div>
                <div className="p-3 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1.5 font-bold">OUTPUT</p>
                  <pre className="font-mono text-sm text-secondary min-h-[80px]">
                    {output || (
                      <span className="text-muted-foreground">👆 Click "Run Code ▶" to see what happens!</span>
                    )}
                  </pre>
                </div>
              </div>
            </div>

            {/* Continue button (only if correct) */}
            {codeCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => setFlowIndex(FLOW_ORDER.indexOf("success"))}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors animate-pulse-glow text-lg"
                >
                  Done! ✅ →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ===== 4. SUCCESS ANIMATION ===== */}
        {currentStep === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-8 relative"
          >
            {/* Confetti particles */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ["hsl(270 70% 55%)", "hsl(160 80% 45%)", "hsl(45 100% 55%)", "hsl(0 84% 60%)"][i % 4],
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ top: "40%", opacity: 1, scale: 1 }}
                    animate={{
                      top: `${-10 + Math.random() * 110}%`,
                      opacity: 0,
                      scale: 0,
                      x: (Math.random() - 0.5) * 200,
                    }}
                    transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.5 }}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
              className="text-8xl"
            >
              🎉
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl font-bold text-foreground"
            >
              Amazing Job!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg"
            >
              You just wrote your first line of Python code! 🐍✨
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={advance}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Claim Reward! 🎁
            </motion.button>
          </motion.div>
        )}

        {/* ===== 5. XP REWARD ===== */}
        {currentStep === "xp" && (
          <motion.div
            key="xp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-8"
          >
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 border-4 border-accent"
            >
              <Zap className="w-12 h-12 text-accent" />
            </motion.div>
            <div>
              <p className="text-muted-foreground text-sm font-bold mb-2">YOU EARNED</p>
              <p className="font-display text-6xl font-bold text-accent">+{xpAnimated} XP</p>
            </div>
            <div className="max-w-xs mx-auto">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: "14%" }}
                  animate={{ width: "24%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">120 → 170 XP · Level 1</p>
            </div>
            <button
              onClick={advance}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Awesome! Next →
            </button>
          </motion.div>
        )}

        {/* ===== 6. BONUS CHALLENGE ===== */}
        {currentStep === "bonus" && (
          <motion.div
            key="bonus"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-accent/15 to-primary/10 rounded-2xl p-6 border border-accent/30 text-center">
              <span className="text-3xl">⭐</span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-2">Bonus Challenge!</h3>
              <p className="text-muted-foreground mt-1">
                Print <span className="text-accent font-bold">your own name</span> to earn <span className="text-accent font-bold">+25 bonus XP</span>!
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-display font-bold text-sm text-foreground">⭐ Bonus Editor</span>
                <button
                  onClick={handleRunBonus}
                  className="flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-1.5 rounded-lg text-xs font-display font-bold hover:bg-accent/90 transition-colors"
                >
                  <Play className="w-3 h-3" /> Run
                </button>
              </div>
              <div className="grid md:grid-cols-2 divide-x divide-border">
                <div className="p-4">
                  <textarea
                    value={bonusCode}
                    onChange={(e) => setBonusCode(e.target.value)}
                    className="w-full h-28 bg-transparent font-mono text-sm text-foreground focus:outline-none resize-none"
                    spellCheck={false}
                  />
                </div>
                <div className="p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2 font-bold">Output:</p>
                  <pre className="font-mono text-sm text-secondary min-h-[80px]">
                    {bonusOutput || "Run your bonus code! ⭐"}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {bonusDone && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-secondary font-bold text-sm flex items-center gap-1"
                >
                  ✅ +25 Bonus XP!
                </motion.span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={advance}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors"
              >
                {bonusDone ? "Continue! 🚀" : "Skip →"}
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== 7. BADGE UNLOCK ===== */}
        {currentStep === "badge" && (
          <motion.div
            key="badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1 }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-accent/20 border-4 border-accent animate-pulse-glow"
            >
              <Trophy className="w-16 h-16 text-accent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground font-bold mb-1">🏆 BADGE UNLOCKED</p>
              <h2 className="font-display text-3xl font-bold text-foreground">First Code!</h2>
              <p className="text-muted-foreground mt-2">You wrote your very first Python program</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={advance}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors"
            >
              What's Next? →
            </motion.button>
          </motion.div>
        )}

        {/* ===== 8. NEXT UNLOCKED ===== */}
        {currentStep === "next" && (
          <motion.div
            key="next"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6 py-4"
          >
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">Lesson Complete! 🎉</h2>
              <p className="text-muted-foreground mt-1">New lesson unlocked!</p>
            </div>

            {/* Completed lesson */}
            <div className="bg-card rounded-2xl p-5 border border-secondary/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-foreground">Hello, Python! 👋</h4>
                <p className="text-xs text-muted-foreground">Module 1 · Lesson 1</p>
              </div>
              <span className="text-secondary font-bold text-sm">✅ Done</span>
            </div>

            {/* Next lesson (unlocked) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-5 border border-primary/50 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors animate-pulse-glow"
              onClick={() => navigate("/lessons")}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl">📦</span>
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-foreground">Variables & Names</h4>
                <p className="text-xs text-muted-foreground">Module 1 · Lesson 2</p>
              </div>
              <span className="text-primary font-display font-bold text-sm">NEW 🔓</span>
            </motion.div>

            {/* Locked lesson */}
            <div className="bg-card/50 rounded-2xl p-5 border border-border flex items-center gap-4 opacity-40">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-muted-foreground">Fun with Numbers</h4>
                <p className="text-xs text-muted-foreground">Module 1 · Lesson 3</p>
              </div>
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => navigate("/lessons")}
                className="bg-muted text-foreground font-display font-bold px-6 py-3 rounded-xl hover:bg-muted/80 transition-colors"
              >
                All Lessons
              </button>
              <button
                onClick={() => navigate("/lessons")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Next Lesson! 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LessonView;
