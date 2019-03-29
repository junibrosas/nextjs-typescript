import * as React from 'react';

export const PageLayout = (props) => {
  const { children } = props;

  return (
    <div className="outer">
        <div className="inner">{children}</div>
        
        <style jsx>{`
          .outer {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            flex-direction: column;
          }
          .inner {
            width: 300px;
          }
        `}
        </style>
      </div>
  )
}

export default PageLayout;
