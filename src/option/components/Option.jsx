import React from 'react';

// styles
import '../styles/option.scss';
// images
import logoImg from '@/public/icons/48.png';

export default function Option() {
  return (
    <div className="flex h-screen justify-center items-center text-base bg-gradient-to-b from-blue-100 to-blue-500">
      <div className="flex flex-col bg-gray-200 p-5 rounded shadow-lg">
        {/* logo */}
        <div className="flex items-center -ml-3">
          <img src={logoImg} width="48" alt="Logo" />
          <h1 className="pt-5 text-2xl text-blue-500">Drink Water</h1>
        </div>
        {/* reminders */}
        <div className="mt-3">
          <h2 className="border-b border-gray-400">Reminders</h2>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex items-center space-x-2">
                <label htmlFor="time">Time</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  className="px-3 py-2 rounded border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Reminder Time"
                />
              </div>
            </div>
          </form>
        </div>

        {/* faqs */}
        <div className="flex flex-col mt-10 text-gray-700">
          <h1 className="text-3xl pb-2">FAQs</h1>
          <div className="mb-2">
            <h2>Why we ask for notification permission?</h2>
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur corporis deleniti dignissimos
              doloribus dolorum eius error ipsam modi non obcaecati pariatur quae quam quo, quod ratione sed velit
              voluptates.
            </p>
          </div>
          <div className="mb-2">
            <h2>Why we ask for alarm permission?</h2>
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias molestiae mollitia omnis perferendis
              recusandae vitae! Accusantium aspernatur debitis deserunt dolor hic, impedit incidunt odio repellendus
              vitae!
            </p>
          </div>
          <div className="mb-2">
            <h2>Who controls my privacy and data?</h2>
            <p className="text-sm">
              We do not request or track private information. We developed the extension with security in mind. The
              extension is free and open-source hosted in GitHub&apos;s public repository.
            </p>
          </div>

          <div className="flex flex-col mt-5 text-gray-700">
            <h1 className="text-3xl pb-2">About</h1>
            <p className="text-sm">Software developer Madan Sapkota developed the extension.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
