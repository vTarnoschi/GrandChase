import React, { useState, useCallback } from "react";
import ChaseCard from "./ChaseCard";
import chase from "./Chase.js";
import "./Chasedex.css";
import Bans from "./Bans";

const maxWidth = { maxWidth: `${window.innerWidth - 509}px` };

const initialState = {
  team1: {
    char: [],
    ban: [],
    turn: true,
  },
  team2: {
    char: [],
    ban: [],
    turn: false,
  },
  banPhase: true,
};

function ChaseDex() {
  const [state, setState] = useState(initialState);

  const handlePlayerOne = (char) => {
    const { name, id, img } = char;
    const banChar = { name, id, img };

    setState((prevState) => ({
      ...prevState,
      team1: {
        ...prevState.team1,
        turn: false,
      },
      team2: {
        ...prevState.team2,
        ban: [...prevState.team2.ban, banChar],
        turn: true,
      },
    }));
  };

  const handlePlayerOneChar = (char) => {
    const { name, id, img } = char;
    const pickChar = { name, id, img };

    setState((prevState) => ({
      ...prevState,
      team1: {
        ...prevState.team1,
        char: [...prevState.team1.char, pickChar],
        turn: false,
      },
      team2: {
        ...prevState.team2,
        turn: true,
      },
    }));
  };

  const handlePlayerTwoChar = (char) => {
    const { name, id, img } = char;
    const pickChar = { name, id, img };

    const banPhase = state.team2.ban.length === 2 ? false : true;

    setState((prevState) => ({
      ...prevState,
      team2: {
        ...prevState.team2,
        char: [...prevState.team2.char, pickChar],
        turn: false,
      },
      team1: {
        ...prevState.team1,
        turn: true,
      },
      banPhase,
    }));
  };

  const handlePlayerTwo = (char) => {
    const { name, id, img } = char;
    const banChar = { name, id, img };

    setState((prevState) => ({
      ...prevState,
      team2: {
        ...prevState.team2,
        turn: false,
      },
      team1: {
        ...prevState.team1,
        ban: [...prevState.team1.ban, banChar],
        turn: true,
      },
      banPhase: false,
    }));
  };

  const getOnClickBan = (char) => {
    if (state.team1.turn) return handlePlayerOne(char);

    return handlePlayerTwo(char);
  };

  const getOnClick = (char) => {
    if (state.banPhase) {
      return getOnClickBan(char);
    }

    if (state.team1.turn) return handlePlayerOneChar(char);

    return handlePlayerTwoChar(char);
  };

  const getBanClass = (id) => {
    const charsBan = [...state.team1.ban, ...state.team2.ban]

    console.log(charsBan.filter((item) => item.id === id).length > 1);

    return charsBan.some((item) => item.id === id)
  }

  return (
    <div className="Chasedex">
      <button onClick={() => setState(initialState)}>Reset</button>

      <h1>Personagens</h1>
      <div className="Chasedex-cards" style={maxWidth}>
        {chase.map((g) => (
          <ChaseCard
            allowStyle
            key={g.id}
            players={state}
            onClick={() => getOnClick(g)}
            id={g.id}
            name={g.name}
            charsBan={getBanClass(g.id)}
            img={g.img}
          />
        ))}
      </div>

      {console.log(state)}
      {/* Players
      {chase.map((g) => {
        if (g.id === state.player1.char.id || g.id === state.team1.char.id) {
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
        if (g.id === state.player1.ban || g.id === state.team1.ban) {
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
      })} */}
      <Bans charsBan={[...state.team1.ban, ...state.team2.ban]} />
    </div>
  );
}

export default ChaseDex;
