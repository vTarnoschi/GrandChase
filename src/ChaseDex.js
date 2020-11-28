import React, { useState, useCallback } from "react";
import ChaseCard from "./ChaseCard";
import chase from "./Chase.js";
import "./Chasedex.css";
import Bans from "./Bans";

const maxWidth = {
  maxWidth: `${window.innerWidth - 920}px`,
  display: "flex",
  justifyContent: "center",
};

const initialState = {
  team1: {
    color: "#ff4d4d",
    char: [],
    ban: [],
    turn: true,
  },
  team2: {
    color: "#3333ff",
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
    const charsBan = [...state.team1.ban, ...state.team2.ban];

    return charsBan.some((item) => item.id === id);
  };

  const getStyle = (id) => {
    if (state.team1.char.some((item) => item.id === id)) {
      return {
        backgroundColor: state.team1.color,
        color: "#fff",
        pointerEvents: "none"
      };
    }

    if (state.team2.char.some((item) => item.id === id)) {
      return {
        backgroundColor: state.team2.color,
        color: "#fff",
        pointerEvents: "none"
      };
    }
  };

  const getChasedexStyle = () => {
    if (state.team2.char.length === 2 && state.team1.char.length === 2) {
      return {
        pointerEvents: "none",
        opacity: 0.8,
      };
    }

    return {};
  };

  return (
    <div className="Chasedex">
      <button className="btn-reset" onClick={() => setState(initialState)}>Reset</button>

      <h1>Personagens</h1>
      <div
        className="Chasedex-cards"
        style={{ ...maxWidth, ...getChasedexStyle() }}
      >
        {chase.map((g) => (
          <ChaseCard
            key={g.id}
            style={getStyle(g.id)}
            onClick={() => getOnClick(g)}
            id={g.id}
            name={g.name}
            charsBan={getBanClass(g.id)}
            img={g.img}
          />
        ))}
      </div>

      <Bans charsBan={[...state.team1.ban, ...state.team2.ban]} />
    </div>
  );
}

export default ChaseDex;
