import React from 'react'
import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'
import { containerVariants, itemVariants } from '../utils/animations'

const ExperienceItem = ({ exp, index }: any) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return '🎓'
      case 'hackathon':
        return '🏆'
      case 'freelance':
        return '💼'
      default:
        return '⭐'
    }
  }

  return (
    <motion.div
      className="relative"
      variants={itemVariants}
    >
      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-2xl border-2 border-cyber-bg"
            whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
          >
            {getIcon(exp.type)}
          </motion.div>
          {index !== experience.length - 1 && (
            <div className="w-1 h-24 bg-gradient-to-b from-neon-blue to-transparent mt-2" />
          )}
        </div>

        {/* Content */}
        <motion.div
          className="pb-8 flex-1"
          whileHover={{ x: 10 }}
        >
          <div className="p-6 bg-cyber-card border border-neon-blue/20 rounded-lg hover:border-neon-blue/50 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-space-grotesk font-bold text-neon-blue">
                  {exp.title}
                </h3>
                <p className="text-gray-400 text-sm">{exp.company}</p>
              </div>
              <span className="text-sm text-neon-cyan font-mono">{exp.duration}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <section id="experience" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          variants={itemVariants}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold">
            05
          </div>
          <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold">
            My <span className="text-neon-blue">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experience.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: 'Internships', value: '3+' },
            { label: 'Hackathons', value: '8' },
            { label: 'Projects', value: '15+' },
            { label: 'Contributions', value: '1.5k+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-4 bg-cyber-card border border-neon-blue/20 rounded-lg text-center hover:border-neon-blue/50 transition-all"
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: 'rgb(0, 212, 255)' }}
            >
              <div className="text-2xl font-bold text-neon-blue mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Experience
