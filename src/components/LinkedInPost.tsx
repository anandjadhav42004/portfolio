import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import { linkedinPost } from '../data/portfolio'

const LinkedInPost = () => {
  return (
    <section id="linkedin-post" className="py-24 px-6 lg:px-24 bg-white border-t-4 border-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono tracking-mega text-brutalist-blue uppercase mb-4">・LinkedIn Update</p>
            <h2 className="text-3xl md:text-4xl font-sans font-black uppercase tracking-tight text-black">
              Latest post from LinkedIn
            </h2>
          </div>
          <a
            href={linkedinPost.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border-3 border-black bg-black text-white uppercase text-xs font-bold tracking-widest hover:bg-zinc-900 transition-colors"
          >
            <FaLinkedinIn /> View post
          </a>
        </div>

        <div className="border-4 border-black bg-brutalist-yellow p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-700">{linkedinPost.date}</span>
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-700">LinkedIn</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-sans font-black text-black tracking-tight mb-4">
            {linkedinPost.title}
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-zinc-900 max-w-3xl">
            {linkedinPost.excerpt}
          </p>
        </div>
      </div>
    </section>
  )
}

export default LinkedInPost
