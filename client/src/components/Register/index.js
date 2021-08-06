import { Button, Container, TextField } from '@material-ui/core';

export default function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
      <Container component="main" maxWidth="xs">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
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
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </form>
      </Container>
  );
}
