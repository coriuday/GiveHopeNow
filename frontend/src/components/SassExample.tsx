import React from 'react';
import '../styles/example.scss';

export const SassExample: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">SASS + Tailwind Example</h2>
      
      <div className="custom-container bg-white shadow-lg rounded-lg">
        <div className="custom-container__header--large">
          This header uses SASS nesting and Tailwind classes
        </div>
        <div className="custom-container__content">
          <p>
            This paragraph is styled with both SASS variables and Tailwind utilities.
            The spacing, colors, and typography combine both approaches.
          </p>
          <p>
            SASS features used include:
            <ul className="list-disc pl-5 mt-2">
              <li>Nesting with the & operator</li>
              <li>Variables ($primary-color, etc.)</li>
              <li>Math operations ($spacing-unit * 2)</li>
              <li>Mixins (@mixin flex-center)</li>
              <li>Functions (lighten() for dark mode)</li>
            </ul>
          </p>
        </div>
      </div>
      
      <div className="centered-element mt-8">
        <div className="text-center">
          <span className="font-bold">This uses the SASS mixin</span>
          <p className="text-sm">@include flex-center</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">How it works:</h3>
        <p className="text-sm">
          The SCSS file imports Tailwind directives, allowing you to use both.
          You can use @apply to include Tailwind utilities within your SASS styles,
          and you can use all of SASS's powerful features like variables, nesting, 
          and mixins alongside Tailwind's utility classes.
        </p>
      </div>
    </div>
  );
}; 