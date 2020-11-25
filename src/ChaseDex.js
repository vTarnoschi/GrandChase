import React, { useState } from "react";
import ChaseCard from "./ChaseCard";
import chase from "./Chase.js";
import "./Chasedex.css";

const initialState = {
  player1: {
    char: {
      name: "",
      id: 0,
    },
    ban: 0,
    turn: true,
  },
  player2: {
    char: {
      name: "",
      id: 0,
    },
    ban: 0,
    turn: false,
  },
  banPhase: true,
};

function ChaseDex() {
  const [state, setState] = useState(initialState);

  const handlePlayerOne = (ban) => {
    setState((prevState) => ({
      ...prevState,
      player1: {
        ...prevState.player1,
        turn: false,
      },
      player2: {
        ...prevState.player2,
        ban,
        turn: true,
      },
    }));
  };

  const handlePlayerOneChar = (name, id) => {
    setState((prevState) => ({
      ...prevState,
      player1: {
        ...prevState.player1,
        char: {
          name,
          id,
        },
        turn: false,
      },
      player2: {
        ...prevState.player2,
        turn: true,
      },
    }));
  };

  const handlePlayerTwoChar = (name, id) => {
    setState((prevState) => ({
      ...prevState,
      player1: {
        ...prevState.player1,
        turn: false,
      },
      player2: {
        ...prevState.player2,
        char: {
          name,
          id,
        },
        turn: true,
      },
    }));
  };

  const handlePlayerTwo = (ban) => {
    setState((prevState) => ({
      ...prevState,
      player1: {
        ...prevState.player1,
        ban,
        turn: true,
      },
      player2: {
        ...prevState.player2,
        turn: false,
      },
      banPhase: false,
    }));
  };

  const getOnClickBan = (ban) => {
    if (state.player1.turn) return handlePlayerOne(ban);

    return handlePlayerTwo(ban);
  };

  const getOnClick = (name, id) => {
    if (state.banPhase) {
      getOnClickBan(id);
    } else {
      if (state.player1.turn) handlePlayerOneChar(name, id);
      else handlePlayerTwoChar(name, id);
    }
  };

  return (
    <div className="Chasedex">
      <button onClick={() => setState(initialState)}>Reset</button>

      <h1>Personagens</h1>
      <div className="Chasedex-cards">
        {chase.map((g) => (
          <ChaseCard
            allowStyle
            key={g.id}
            players={state}
            onClick={() => getOnClick(g.name, g.id)}
            id={g.id}
            name={g.name}
            img={g.img}
          />
        ))}
      </div>

        Players
      {chase.map((g) => {
        if (g.id === state.player1.char.id || g.id === state.player2.char.id) {
          return (
            <React.Fragment>
              <ChaseCard
                allowStyle={false}
                key={g.id}
                players={state}
                id={g.id}
                name={g.name}
                img={g.img}
              />
            </React.Fragment>
          );
        }

        return null;
      })}

        Ban phase
      {chase.map((g) => {
        if (g.id === state.player1.ban || g.id === state.player2.ban) {
          return (
            <ChaseCard
              key={g.id}
              players={state}
              id={g.id}
              name={g.name}
              img={g.img}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export default ChaseDex;
