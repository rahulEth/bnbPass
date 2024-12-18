import { AccountCircle, Http } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PasswordInput from "../PasswordInput";
import { CredType } from "../../enums/CredTypeEnums";
import CustomButton from "../CustomButton";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTING_PATH } from "../../constants";

export interface SaveCredFormProps {
  url: string;
  username: string;
  password: string;
  type: CredType;
}

const SaveCredForm = ({
  className = "",
  onSubmitCred,
  isLoading,
}: {
  className?: string;
  onSubmitCred?: (data: SaveCredFormProps) => void;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SaveCredFormProps>({
    defaultValues: {
      url: "",
      username: "",
      password: "",
      type: undefined,
    },
  });

  const onSubmit = (data: SaveCredFormProps) => {
    console.log("Submitted data: ", data);
    if (!!onSubmitCred) onSubmitCred(data);
  };
  return (
    <form
      className={`flex flex-col gap-4 ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="url"
        control={control}
        rules={{
          required: "Required",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120 }}
            error={!!error}
          >
            <TextField
              id="url"
              label="Website URL"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Http />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              type="url"
              error={!!error}
              {...field}
            />
            {!!error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        name="username"
        control={control}
        rules={{
          required: "Required",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120 }}
            error={!!error}
          >
            <TextField
              id="username"
              label="Username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              type="text"
              error={!!error}
              {...field}
            />
            {!!error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Required",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120 }}
            error={!!error}
          >
            <PasswordInput
              id="password"
              label="Password"
              {...field}
              error={!!error}
            />
            {!!error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        name="type"
        control={control}
        rules={{
          required: "Required",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120 }}
            error={!!error}
          >
            <InputLabel id="type-label">Type</InputLabel>
            <Select labelId="type-label" id="type" label="type" {...field}>
              <MenuItem value={CredType.SOCIAL}>Social</MenuItem>
              <MenuItem value={CredType.PERSONAL}>Personal</MenuItem>
              <MenuItem value={CredType.BANKING}>Banking</MenuItem>
              <MenuItem value={CredType.OTHER}>Other</MenuItem>
            </Select>
            {!!error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <CustomButton
        className="!rounded-full !text-lg !py-3"
        type="submit"
        disabled={isLoading}
      >
        Submit
      </CustomButton>
      <CustomButton
        variant="outlined"
        className="!rounded-full !text-lg !py-3"
        onClick={() => navigate(ROUTING_PATH.HOME)}
      >
        Back to Home
      </CustomButton>
    </form>
  );
};

export default SaveCredForm;
