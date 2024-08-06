import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import TypingAnimation from "@/components/typeanimation";
import Footer from "@/components/Footer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Institution {
  id?: number;
  temple: string;
  division: string;
  whatsappGroup: string;
  protectingInstitution: string;
}

const divisions = [
  "Barishal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Rajshahi",
  "Rangpur",
  "Mymensingh",
  "Sylhet",
];

const Home = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [open, setOpen] = useState(false);
  const [currentInstitution, setCurrentInstitution] =
    useState<Institution | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("All");

  useEffect(() => {
    axios.get("/api/religious-institutions").then((response) => {
      setInstitutions(response.data);
    });
  }, []);

  const handleOpen = (institution: Institution | null = null) => {
    setCurrentInstitution(
      institution || {
        temple: "",
        division: "",
        whatsappGroup: "",
        protectingInstitution: "",
      }
    );
    setIsEditMode(institution !== null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentInstitution(null);
  };

  const handleSave = async () => {
    if (currentInstitution) {
      if (isEditMode) {
        await axios.put(
          `/api/religious-institutions/${currentInstitution.id}`,
          currentInstitution
        );
        setInstitutions(
          institutions.map((i) =>
            i.id === currentInstitution.id ? currentInstitution : i
          )
        );
      } else {
        const response = await axios.post(
          "/api/religious-institutions",
          currentInstitution
        );
        setInstitutions([...institutions, response.data]);
      }
      handleClose();
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDivision(event.target.value as string);
  };

  const filteredInstitutions =
    selectedDivision === "All"
      ? institutions
      : institutions.filter(
          (institution) => institution.division === selectedDivision
        );

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "crimson", flexGrow: 1 }}
          >
            Community Shield
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: "100%",
          height: "800px",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "800px",
            backgroundImage: 'url("/images/background.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(50%)", // Adjust the brightness here
            zIndex: -1,
          },
        }}
      >
        <Container>
          <Typography variant="h3">
            <TypingAnimation
              text="Let us protect our local temples/churches/buddhist temples in our new Bangladesh."
              speed={50}
            />
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#72230F", marginBottom: "20px" }}
        >
          Volunteer to help protect our establishments
        </Typography>
        <Typography variant="body1">
          This is a simple way for our students to gather and help protect our
          minority religious institutions. Find your local
          temple/church/buddhist temple and join the whatsapp group to help
          protect it.
        </Typography>
        <Typography variant="body1">
          If a temple you know is not added yet, feel free to create one
          yourself.{" "}
        </Typography>

        <Typography variant="body1">
          {" "}
          Let us all help protect our minority brothers and sisters from
          political vandalism.
        </Typography>
      </Box>
      <Container sx={{ pt: 5 }} maxWidth="xl">
        <Box
          sx={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="division-filter-label">
              Filter by Division
            </InputLabel>
            <Select
              labelId="division-filter-label"
              value={selectedDivision}
              onChange={(e: any) => handleFilterChange(e)}
              label="Filter by Division"
            >
              <MenuItem value="All">All</MenuItem>
              {divisions.map((division) => (
                <MenuItem key={division} value={division}>
                  {division}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add New Entry
          </Button>
        </Box>
        <TableContainer sx={{ pb: 10 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>temple/church</strong>
                </TableCell>
                <TableCell>
                  <strong>Division</strong>
                </TableCell>
                <TableCell>
                  <strong>Volunteer Whatsapp Group</strong>
                </TableCell>
                <TableCell>
                  <strong>Protecting school/college</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInstitutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell>{institution.temple}</TableCell>
                  <TableCell>{institution.division}</TableCell>
                  <TableCell>{institution.whatsappGroup}</TableCell>
                  <TableCell>{institution.protectingInstitution}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(institution)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {currentInstitution && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Temple"
                  value={currentInstitution.temple}
                  onChange={(e) =>
                    setCurrentInstitution({
                      ...currentInstitution,
                      temple: e.target.value,
                    })
                  }
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="division-label">Division</InputLabel>
                  <Select
                    labelId="division-label"
                    value={currentInstitution.division}
                    label="Division"
                    onChange={(e) =>
                      setCurrentInstitution({
                        ...currentInstitution,
                        division: e.target.value as string,
                      })
                    }
                  >
                    {divisions.map((division) => (
                      <MenuItem key={division} value={division}>
                        {division}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Whatsapp Group"
                  value={currentInstitution.whatsappGroup}
                  onChange={(e) =>
                    setCurrentInstitution({
                      ...currentInstitution,
                      whatsappGroup: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Protecting Institution"
                  value={currentInstitution.protectingInstitution}
                  onChange={(e) =>
                    setCurrentInstitution({
                      ...currentInstitution,
                      protectingInstitution: e.target.value,
                    })
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  {isEditMode ? "Save" : "Add"}
                </Button>
              </>
            )}
          </Box>
        </Modal>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
