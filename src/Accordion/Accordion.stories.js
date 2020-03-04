import React, { useRef } from 'react';

import Accordion from './Accordion';

export default {
  title: 'Accordion',
  component: Accordion,
};

function AccordionWithDefaultHeaders() {
  const ref = useRef(null);

  const items = [
    { title: 'Dallas Mavericks', msg: 'Best team in the NBA!' },
    { title: 'Dallas Cowboys', msg: 'Most overrated team in the world!' },
    { title: 'Harwood Blackhawks', msg: 'My very crappy junior high team' },
    { title: 'Texas Rangers', msg: 'One good season' },
    { title: 'Dallas Wings', msg: 'Lets go ladies!' },
  ];

  function renderContent(args) {
    const { index } = args;
    return <p>{items[index].msg}</p>;
  }

  return (
    <>
      <button onClick={() => ref.current.openAllSections()}>Open All</button>
      <button onClick={() => ref.current.closeAllSections()}>Close All</button>

      <Accordion
        ref={ref}
        title="Accordion With Default Headers"
        // initOpenSections={items.map((item, index) => index)}
      >
        {items.map((item, index) => {
          return (
            <Accordion.Section
              key={index}
              title={item.title}
              renderContent={renderContent}
            />
          );
        })}
      </Accordion>
    </>
  );
}

export { AccordionWithDefaultHeaders };
