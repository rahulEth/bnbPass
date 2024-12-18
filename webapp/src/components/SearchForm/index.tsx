import { Search } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CredType } from "../../enums/CredTypeEnums";

export interface SearchFormProps {
  type: CredType | "all";
  search: string;
}

const SearchForm = ({ className = "" }: { className?: string }) => {
  const { control, handleSubmit } = useForm<SearchFormProps>({
    defaultValues: {
      type: undefined,
      search: "",
    },
  });

  const onSubmit = (data: SearchFormProps) => {
    console.log("submitted data: ", data);
  };

  return (
    <form
      className={`flex flex-row items-start gap-2 ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="type"
        control={control}
        rules={{
          required: "Required",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            variant="standard"
            sx={{ minWidth: 120 }}
            error={!!error}
          >
            <InputLabel id="type-label">Type</InputLabel>
            <Select labelId="type-label" id="type" {...field} label="type">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={CredType.SOCIAL}>Social</MenuItem>
              <MenuItem value={CredType.PERSONAL}>Personal</MenuItem>
              <MenuItem value={CredType.BANKING}>Banking</MenuItem>
              <MenuItem value={CredType.OTHER}>Other</MenuItem>
            </Select>
            {!!error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <TextField
            id="search"
            label="Search"
            variant="standard"
            className="flex-grow"
            {...field}
          />
        )}
      />
      <IconButton
        color="primary"
        aria-label="search"
        size="large"
        className=""
        type="submit"
      >
        <Search />
      </IconButton>
    </form>
  );
};

export default SearchForm;
