import React from "react";
import "pages/LoadingScreen/LoadingScreen.css";
interface LoadingScreenProps {}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({}) => {
  return (
    <div className="LoadingScreen">
      <div className="LoadingScreen__container">
        <div className="scene" style={{ color: "#9878d9" }}>
          <div className="word">
            <div className="letter__wrap" style={{ zIndex: 0 }}>
              <div className="letter" data-letter="L">
                <span className="letter__panel" aria-hidden="true">
                  L
                </span>
                <span className="letter__panel" aria-hidden="true">
                  W
                </span>
                <span className="letter__panel" aria-hidden="true">
                  L
                </span>
                <span className="letter__panel" aria-hidden="true">
                  W
                </span>
                <span className="letter__panel" />
              </div>
            </div>
            <div className="letter__wrap" style={{ zIndex: 1 }}>
              <div className="letter" data-letter="o">
                <span className="letter__panel" aria-hidden="true">
                  o
                </span>
                <span className="letter__panel" aria-hidden="true">
                  a
                </span>
                <span className="letter__panel" aria-hidden="true">
                  o
                </span>
                <span className="letter__panel" aria-hidden="true">
                  a
                </span>
                <span className="letter__panel" />
              </div>
            </div>
            <div className="letter__wrap" style={{ zIndex: 2 }}>
              <div className="letter" data-letter="a">
                <span className="letter__panel" aria-hidden="true">
                  a
                </span>
                <span className="letter__panel" aria-hidden="true">
                  i
                </span>
                <span className="letter__panel" aria-hidden="true">
                  a
                </span>
                <span className="letter__panel" aria-hidden="true">
                  i
                </span>
                <span className="letter__panel" />
              </div>
            </div>
            <div className="letter__wrap" style={{ zIndex: 3 }}>
              <div className="letter" data-letter="d">
                <span className="letter__panel" aria-hidden="true">
                  d
                </span>
                <span className="letter__panel" aria-hidden="true">
                  t
                </span>
                <span className="letter__panel" aria-hidden="true">
                  d
                </span>
                <span className="letter__panel" aria-hidden="true">
                  t
                </span>
                <span className="letter__panel" />
              </div>
            </div>
            <div className="letter__wrap" style={{ zIndex: 4 }}>
              <div className="letter" data-letter="i">
                <span className="letter__panel" aria-hidden="true">
                  i
                </span>
                <span className="letter__panel" aria-hidden="true">
                  .
                </span>
                <span className="letter__panel" aria-hidden="true">
                  i
                </span>
                <span className="letter__panel" aria-hidden="true">
                  .
                </span>
                <span className="letter__panel" />
              </div>
            </div>
            <div className="letter__wrap" style={{ zIndex: 5 }}>
              <div className="letter" data-letter="n">
                <span className="letter__panel" aria-hidden="true">
                  n
                </span>
                <span className="letter__panel" aria-hidden="true">
                  .
                </span>
                <span className="letter__panel" aria-hidden="true">
                  n
                </span>
                <span className="letter__panel" aria-hidden="true">
                  .
                </span>
                <span className="letter__panel" />
              </div>
            </div>
            <div className="letter__wrap" style={{ zIndex: 6 }}>
              <div className="letter" data-letter="g">
                <span className="letter__panel" aria-hidden="true">
                  g
                </span>
                <span className="letter__panel" aria-hidden="true">
                  .
                </span>
                <span className="letter__panel" aria-hidden="true">
                  g
                </span>
                <span className="letter__panel" aria-hidden="true">
                  .
                </span>
                <span className="letter__panel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
