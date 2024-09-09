import axios from "axios";

export const addEventToTicket = async (eventId: string, odd: number, stake: number, token: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/betting/addEvent",
        {
          eventId,
          odd,
          stake,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Event added to ticket:", response.data);
    } catch (error) {
      console.error("Error adding event to ticket:", error);
    }
  };

export const removeEventFromTicket = async (eventId: string, odd: number, stake: number, token: string) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/betting/removeEvent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            eventId,
            odd,
            stake,
          }
        }
      );
      console.log("Event removed from ticket:", response.data);
    } catch (error) {
      console.error("Error removing event from ticket:", error);
    }
  };