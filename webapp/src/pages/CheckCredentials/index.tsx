import { useContext, useMemo, useState } from "react";
import CredDetailsCard, { CredDetails } from "../../components/CredDetailsCard";
import CredInfoCard from "../../components/CredInfoCard";
import MainBody from "../../components/MainBody";
import { useQueryGetCredentialsByType } from "../../api";
import Loading from "../../components/Loading";
import NoResultFound from "./assets/no-result.svg?react";
import SomethingWentWrong from "./assets/something-went-wrong.svg?react";
import ErrorCard from "./ErrorCard";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { CredType } from "../../enums/CredTypeEnums";
import { Web3ProviderContext } from "../../contexts/Web3Context";

export interface SearchFormProps {
  type: CredType | "all";
  search: string;
}

const CheckCredentials = () => {
  const { account = "" } = useContext(Web3ProviderContext) || {};
  const [selectedCred, setSelectedCred] = useState<CredDetails>();

  const { control, handleSubmit, watch } = useForm<SearchFormProps>({
    defaultValues: {
      type: "all",
      search: "",
    },
  });

  const type = useMemo(() => watch("type"), [watch("type")]);

  const { isLoading, data, isError } = useQueryGetCredentialsByType({
    type,
    address: account,
  });

  const onSelectCred = (cred: CredDetails) => {
    setSelectedCred(selectedCred == cred ? undefined : cred);
  };
  const onSubmit = (data: SearchFormProps) => {
    console.log("submitted data: ", data);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainBody className="!col-span-full">
          <h1 className="text-4xl font-semibold mb-4">
            Check Your Credentials
          </h1>
          <form
            className={`flex flex-row items-start gap-2 mb-6`}
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
                  <Select
                    labelId="type-label"
                    id="type"
                    {...field}
                    label="type"
                  >
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

          {isError ? (
            <ErrorCard>
              <SomethingWentWrong className="w-80 h-80 mx-auto" />
              <div className="text-center text-slate-500 flex flex-col gap-2">
                <div className="text-lg font-semibold">
                  Something Went Wrong!
                </div>
                <div className="text-sm font-semibold">Please Try Again</div>
              </div>
            </ErrorCard>
          ) : data?.length ? (
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-full md:col-span-3 flex flex-col gap-4">
                {data?.map((cred) => (
                  <CredInfoCard
                    {...cred}
                    onCardClick={() => onSelectCred(cred)}
                    className={`${
                      selectedCred == cred ? "outline outline-blue-500/50" : ""
                    }`}
                  />
                ))}
              </div>
              <div className="hidden md:!col-span-2 md:!block">
                <CredDetailsCard creds={selectedCred} />
              </div>
            </div>
          ) : (
            <ErrorCard>
              <NoResultFound className="w-80 h-80 mx-auto" />
              <div className="text-center text-lg font-semibold text-slate-500">
                Results Not Found
              </div>
            </ErrorCard>
          )}
        </MainBody>
      )}
    </>
  );
};

export default CheckCredentials;
