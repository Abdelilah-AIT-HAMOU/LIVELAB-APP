import React from 'react';

const Menu = ({ onMenuClick }) => {
  return (
    <div className="menu">
      <h2>HR MANAGER</h2>
      <button onClick={() => onMenuClick('DISP')}>DISP</button>
      <button onClick={() => onMenuClick('MODIFICATION')}>MODIFICATION</button>
      <button onClick={() => onMenuClick('PROJECT CICD')}>PROJECT CICD</button>
      {/* Add more buttons as needed */}
    </div>
  );
};

export default Menu;
