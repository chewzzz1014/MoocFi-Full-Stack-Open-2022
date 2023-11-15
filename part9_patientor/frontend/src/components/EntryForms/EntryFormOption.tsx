import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  entryFormType: string,
  setEntryFormType: React.Dispatch<React.SetStateAction<string>>,
  openModal: () => void
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allEntryNames = [
  'Health Check',
  'Hospital',
  'Occupational Healthcare'
];

export default function EntryFormOption(props: Props) {
  const handleChange = (event: SelectChangeEvent<typeof props.entryFormType>) => {
    const {
      target: { value },
    } = event;
    props.setEntryFormType(value);
    console.log(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Entry Form Type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={props.entryFormType}
          onChange={handleChange}
          input={<OutlinedInput label="Choose Entry Type" />}
          MenuProps={MenuProps}
        >
          {allEntryNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
