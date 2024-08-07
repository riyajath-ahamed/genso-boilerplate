import React from 'react'
import { PageBg } from '.'

const Header = () => {
  return (
    <div className="relative">
      <PageBg />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
              <div className="relative mb-8 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,_theme(colors.gray.600)_4.5px,_transparent_0)] after:w-[41px]">
                <span className="text-[13px] font-medium text-white">
                  Genso CLI
                </span>
              </div>
              <div className="font-mono text-gray-500 [&_span]:opacity-0">
                <span className="animate-[code-1_10s_infinite] text-gray-200">
                  npx genso my-app
                </span>{" "}
                <span className="animate-[code-2_10s_infinite]">
                    Creating project...
                </span>
                <br />
                <span className="animate-[code-3_10s_infinite]">
                  
                </span>{" "}
                <span className="animate-[code-4_10s_infinite]">
                    Installing dependencies...
                </span>
                <br />
                <br />
                <span className="animate-[code-5_10s_infinite] text-gray-200">
                Genso CLI ⚡
                </span>
                <br />
                <span className="animate-[code-6_10s_infinite]">
                  Package published.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header