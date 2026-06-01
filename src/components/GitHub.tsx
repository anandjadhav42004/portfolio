import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import { containerVariants, itemVariants } from '../utils/animations'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'anandjadhav42004'

export interface Repo {
  id: number
  name: string
  description: string
  url: string
  language: string
  stars: number
  forks: number
}

interface GitHubStats {
  contributions: number
  repos: number
  followers: number
}

interface GitHubProps {
  repos?: Repo[]
  stats?: GitHubStats
  error?: string
}

const GitHub = ({ repos = [], stats = { contributions: 0, repos: 0, followers: 0 }, error }: GitHubProps) => {
  return (
    <section id="github" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center gap-3 mb-12"
          variants={itemVariants}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold">
            06
          </div>
          <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold">
            Building on <span className="text-neon-blue">GitHub</span>
          </h2>
        </motion.div>

        {error ? (
          <div className="text-center py-12 text-red-600 font-bold">
            Could not load live GitHub data
          </div>
        ) : (
          <>
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              variants={containerVariants}
            >
              {[
                { icon: FaGithub, label: 'Repositories', value: stats.repos },
                { icon: FaStar, label: 'Stars Earned', value: stats.followers },
                { icon: FaCodeBranch, label: 'Contributions', value: '1.5k+' },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    className="p-6 bg-cyber-card border border-neon-blue/20 rounded-lg hover:border-neon-blue/50 transition-all text-center"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <Icon className="text-3xl text-neon-blue mb-3 mx-auto" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-6"
            >
              {repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-cyber-card border border-neon-blue/20 rounded-lg hover:border-neon-blue/50 transition-all group"
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: 'rgb(0, 212, 255)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-space-grotesk font-bold text-neon-blue group-hover:text-neon-cyan transition-colors">
                        {repo.name}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neon-blue/10">
                    <span className="text-xs font-mono text-neon-cyan">{repo.language}</span>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaStar size={14} />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCodeBranch size={14} />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </>
        )}

        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cyber-card border border-neon-blue/50 rounded-lg text-neon-blue font-semibold hover:bg-neon-blue/10 transition-all"
            whileHover={{ x: 5 }}
          >
            <FaGithub />
            Visit My GitHub Profile
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default GitHub
