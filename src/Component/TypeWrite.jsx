import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypeWrite = () => {
    return (
        <div className='w-10/12 mx-auto flex items-center mt-6'>
      <h1 style={{ fontSize: "2rem", color: 'pink', fontWeight: "bold" }}>
        <span>
          <Typewriter
            words={["Plan Tree Save the world", "Donate blood Save the World", "People for People"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
    </div>
    );
};

export default TypeWrite;