import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Getting Started with Python",
    emoji: "🐣",
    lessons: [
      { id: 1, title: "Hello, Python!", emoji: "👋", done: true },
      { id: 2, title: "Your First Program", emoji: "💻", done: true },
      { id: 3, title: "Print Magic", emoji: "✨", done: true },
      { id: 4, title: "Variables & Names", emoji: "📦", done: false, current: true },
      { id: 5, title: "Fun with Numbers", emoji: "🔢", done: false },
      { id: 6, title: "Text & Strings", emoji: "📝", done: false },
    ],
  },
  {
    id: 2,
    title: "Making Decisions",
    emoji: "🤔",
    locked: true,
    lessons: [
      { id: 7, title: "If Statements", emoji: "🔀", done: false },
      { id: 8, title: "Else & Elif", emoji: "🛤️", done: false },
      { id: 9, title: "Comparisons", emoji: "⚖️", done: false },
      { id: 10, title: "Logic Puzzles", emoji: "🧩", done: false },
    ],
  },
  {
    id: 3,
    title: "Loops & Repetition",
    emoji: "🔄",
    locked: true,
    lessons: [
      { id: 11, title: "For Loops", emoji: "🏃", done: false },
      { id: 12, title: "While Loops", emoji: "♾️", done: false },
      { id: 13, title: "Loop Games", emoji: "🎮", done: false },
    ],
  },
];

const Lessons = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Lessons 📚</h1>
        <p className="text-muted-foreground mt-1">Learn Python step by step — each lesson builds on the last!</p>
      </div>

      {modules.map((mod, mi) => (
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: mi * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{mod.emoji}</span>
            <h2 className="font-display text-xl font-bold text-foreground">
              Module {mod.id}: {mod.title}
            </h2>
            {mod.locked && (
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked
              </span>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mod.lessons.map((lesson, li) => (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: mi * 0.1 + li * 0.05 }}
                onClick={() => !mod.locked && navigate(`/lessons/${lesson.id}`)}
                disabled={mod.locked}
                className={`relative text-left bg-card rounded-xl p-4 border transition-all ${
                  mod.locked
                    ? "border-border opacity-50 cursor-not-allowed"
                    : lesson.current
                    ? "border-primary animate-pulse-glow cursor-pointer"
                    : "border-border hover:border-primary/50 cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lesson.emoji}</span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground">{lesson.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {lesson.done ? "✅ Complete" : lesson.current ? "▶️ In Progress" : "⬜ Not started"}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Lessons;
