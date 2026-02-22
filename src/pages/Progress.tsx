import { motion } from "framer-motion";

const skills = [
  { name: "Print Statements", level: 3, max: 5, emoji: "📢" },
  { name: "Variables", level: 1, max: 5, emoji: "📦" },
  { name: "Numbers & Math", level: 0, max: 5, emoji: "🔢" },
  { name: "Strings", level: 0, max: 5, emoji: "📝" },
  { name: "If/Else", level: 0, max: 5, emoji: "🔀" },
  { name: "Loops", level: 0, max: 5, emoji: "🔄" },
];

const Progress = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Your Progress 📊</h1>
        <p className="text-muted-foreground mt-1">See how far you've come — keep going!</p>
      </div>

      {/* Overall */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 border border-border text-center"
      >
        <span className="text-5xl">🏅</span>
        <p className="font-display text-4xl font-bold text-foreground mt-3">120 XP</p>
        <p className="text-muted-foreground mt-1">Total Experience Points</p>
        <div className="max-w-sm mx-auto mt-4">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-xp-fill" style={{ width: "24%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">120 / 500 XP to Level 2</p>
        </div>
      </motion.div>

      {/* Skills */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Skills 🎯</h2>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-4"
            >
              <span className="text-2xl">{skill.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-display font-bold text-sm text-foreground">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">Lv {skill.level}/{skill.max}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${(skill.level / skill.max) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
