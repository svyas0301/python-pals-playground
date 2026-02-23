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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <motion.img
              src={mascot}
              alt="Py the Python"
              className="w-28 h-28 mx-auto"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            />
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-xs text-primary font-bold mb-2">🐍 Py the Python says...</p>
              <p className="text-foreground text-lg leading-relaxed">
                Hey there, future coder! 🎉 Today you'll write your <span className="text-primary font-bold">very first line of code</span>! 
                Every expert started right here. Ready? Let's gooooo! 🚀
              </p>
            </div>
            <button
              onClick={advance}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors text-lg"
            >
              I'm Ready! 💪
            </button>
          </motion.div>
        )}

        {/* ===== 2. MISSION CARD ===== */}
        {currentStep === "mission" && (
          <motion.div
            key="mission"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-8 border border-primary/30 text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
                <Sparkles className="w-4 h-4" /> YOUR MISSION
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Make the Computer Talk! 📢
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Use Python's <code className="bg-muted px-2 py-0.5 rounded text-secondary font-mono text-sm">print()</code> command 
                to make the computer say <span className="text-accent font-bold">"Hello, World!"</span>
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg border border-border text-sm">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent font-bold">+50 XP</span>
                </div>
                <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg border border-border text-sm">
                  <Trophy className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-secondary font-bold">Badge</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={advance}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors text-lg"
              >
                Let's Code! 🧱
              </button>
            </div>
          </motion.div>
        )}

        {/* ===== 3. CODE INTERACTION ===== */}
        {currentStep === "code" && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Hint from Py */}
            <div className="flex gap-3 items-start bg-card rounded-xl p-4 border border-border">
              <img src={mascot} alt="Py" className="w-10 h-10 animate-float flex-shrink-0" />
              <div>
                <p className="text-xs text-primary font-bold mb-1">💡 Hint from Py</p>
                <p className="text-sm text-muted-foreground">
                  Type <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono">print("Hello, World!")</code> and hit <strong className="text-foreground">Run Code</strong>!
                </p>
              </div>
            </div>

            {/* Editor */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-display font-bold text-sm text-foreground">🧱 Code Editor</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setCode(""); setOutput(""); setCodeCorrect(false); }}
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
                    className="w-full h-36 bg-transparent font-mono text-sm text-foreground focus:outline-none resize-none"
                    spellCheck={false}
                  />
                </div>
                <div className="p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2 font-bold">Output:</p>
                  <pre className="font-mono text-sm text-secondary min-h-[100px]">
                    {output || "Click 'Run Code' to see output here! 🚀"}
                  </pre>
                </div>
              </div>
            </div>

            {/* Continue button (only if correct) */}
            {codeCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <button
                  onClick={advance}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-3 rounded-xl transition-colors animate-pulse-glow"
                >
                  It Worked! Continue 🎉
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
