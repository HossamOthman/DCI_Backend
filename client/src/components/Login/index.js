import { Button, Container, TextField } from '@material-ui/core';

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
      <Container component="main" maxWidth="xs">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
      </Container>
  );
}
