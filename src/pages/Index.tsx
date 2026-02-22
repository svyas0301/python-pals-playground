import { motion } from "framer-motion";
import mascot from "@/assets/mascot.png";
import { BookOpen, Trophy, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Lessons Done", value: "3", emoji: "📚", color: "bg-primary/20 text-primary" },
  { label: "XP Earned", value: "120", emoji: "⚡", color: "bg-accent/20 text-accent" },
  { label: "Achievements", value: "2", emoji: "🏆", color: "bg-success/20 text-success" },
  { label: "Day Streak", value: "3", emoji: "🔥", color: "bg-destructive/20 text-destructive" },
];

const recentLessons = [
  { title: "Hello, Python!", module: 1, step: "3/12", emoji: "👋", progress: 25 },
  { title: "Variables & Names", module: 1, step: "0/10", emoji: "📦", progress: 0 },
  { title: "Fun with Numbers", module: 1, step: "0/8", emoji: "🔢", progress: 0 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card rounded-2xl p-6 border border-border overflow-hidden"
      >
        <div className="flex items-start gap-5">
          <motion.img
            src={mascot}
            alt="Py the Python"
            className="w-20 h-20 animate-float"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Hey there, future coder! 🎉
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm <span className="text-primary font-bold">Py the Python</span> — your coding buddy! 
              Ready to learn the coolest programming language in the world? 
              Every expert coder started exactly where you are now. Let's gooooo! 🚀
            </p>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="bg-card rounded-2xl p-5 border border-border text-center"
          >
            <span className="text-3xl">{stat.emoji}</span>
            <p className="font-display text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-foreground">Continue Learning 📖</h3>
          <button onClick={() => navigate("/lessons")} className="text-sm text-primary font-semibold hover:underline">
            View All →
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recentLessons.map((lesson, i) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i }}
              onClick={() => navigate("/lessons/1")}
              className="bg-card rounded-2xl p-5 border border-border cursor-pointer hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lesson.emoji}</span>
                <div>
                  <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">Module {lesson.module} · {lesson.step}</p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6 border border-primary/30 animate-pulse-glow"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">🎯</span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-foreground">Daily Challenge</h3>
            <p className="text-sm text-muted-foreground">
              Print your name using Python! Complete it to earn <span className="text-accent font-bold">+50 XP</span>
            </p>
          </div>
          <button
            onClick={() => navigate("/lessons/1")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            Start! 🚀
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
