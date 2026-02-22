import { motion } from "framer-motion";

const achievements = [
  { title: "First Code!", desc: "Wrote your first line of Python", emoji: "🎉", unlocked: true },
  { title: "Hello World", desc: "Used print() for the first time", emoji: "👋", unlocked: true },
  { title: "3 Day Streak", desc: "Learned 3 days in a row", emoji: "🔥", unlocked: true },
  { title: "Variable Master", desc: "Create 5 variables", emoji: "📦", unlocked: false },
  { title: "Math Wizard", desc: "Solve 10 math challenges", emoji: "🧙", unlocked: false },
  { title: "Loop Legend", desc: "Write your first loop", emoji: "🔄", unlocked: false },
  { title: "Bug Hunter", desc: "Fix 5 code errors", emoji: "🐛", unlocked: false },
  { title: "Speed Coder", desc: "Finish a lesson in under 5 min", emoji: "⚡", unlocked: false },
];

const Achievements = () => {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Achievements 🏆</h1>
        <p className="text-muted-foreground mt-1">
          {unlocked}/{achievements.length} unlocked — keep coding to earn more!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-2xl p-5 border transition-all ${
              a.unlocked ? "border-accent/50" : "border-border opacity-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{a.unlocked ? a.emoji : "🔒"}</span>
              <div>
                <h3 className="font-display font-bold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
