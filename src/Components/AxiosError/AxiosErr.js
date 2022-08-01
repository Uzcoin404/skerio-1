import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function AxiosError({ axiosErr }) {
  return (
    <section>
      <Alert variant="filled" severity="error">
        {axiosErr}!
      </Alert>
    </section>
  );
}
