import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTheme } from "@/lib/features/theme/themeReducer";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector((state) => state.themeReducer.darkTheme);
  return (
    <div className="themeToggle">
      <Switch
        checked={darkTheme}
        onClick={() => dispatch(setTheme(!darkTheme))}
      />
      {/* <span>Merch Theme</span> */}
    </div>
  );
};

export default ThemeToggle;
