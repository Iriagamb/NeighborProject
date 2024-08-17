import { faL } from "@fortawesome/free-solid-svg-icons";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // message: null,
      neighbor: {},
      seller: {},
      admin: {},
      users: null,
      favorites: [],
      recommendations: []
    },
    actions: {
      addToFavorite: (id, name, role) => {
        const store = getStore();
        const isFavoriteExist = store.favorites.some(
          (favorite) => favorite.id === id && favorite.role === role
        );
        if (!isFavoriteExist) {
          setStore({
            favorites: [...store.favorites, { id, name, role }],
          });
        }
      },


      removeToFavorite: (id) => {
        const store = getStore();
        const filteredFavorite = store.favorites.filter(
          (favorite) => favorite.name !== id
        );
        setStore({ favorites: filteredFavorite });
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password, userType) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },

            body: JSON.stringify({ email, password, userType }),
          });
          if (!response.ok) {
            return false;
          }
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      getProfileNeighbor: async (id) => {
        console.log("HEREEEE PROFILE", id);
        if (!id) return;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/neighbor/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ neighbor: data });
        } catch (error) {
          console.error("Error fetching neighbor:", error.message);
        }
      },

      getProfileSeller: async (id) => {
        if (!id) return;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ seller: data });
        } catch (error) {
          console.error("Error fetching seller:", error.message);
        }
      },

      getProfileAdmin: async (id) => {
        if (!id) return;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/administrator/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ admin: data });
        } catch (error) {
          console.error("Error fetching admin:", error.message);
        }
      },

      getAllDirectory: async () => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/directory`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ users: data });
        } catch (error) {
          console.error("Error fetching directory:", error.message);
        }
      },
      editNeighbor: async (id, fields) => {
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/editNeighbor/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: fields.name,
                lastname: fields.lastname,
                floor: fields.floor,
                email: fields.email,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          console.log("DATAAAA", data);
          actions.getProfileNeighbor(id);
        } catch (error) {
          console.error("Error editing neighbor:", error.message);
        }
      },
      editSeller: async (id, fields) => {
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/editSeller/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: fields.name,
                lastname: fields.lastname,
                floor: fields.floor,
                email: fields.email,
                phone: fields.phone,
                shopName: fields.shopName,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          actions.getProfileSeller(id);
        } catch (error) {
          console.error("Error editing seller:", error.message);
        }
      },
      editAdmin: async (id, fields) => {
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/editAdministrator/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: fields.name,
                lastname: fields.lastname,
                floor: fields.floor,
                email: fields.email,
                buildingName: fields.buildingName,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          actions.getProfileSeller(id);
        } catch (error) {
          console.error("Error editing seller:", error.message);
        }
      },
      registerNeighbor: async (email, password, name, lastname, floor) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/neighbor/registers`, {
            method: "POST",
            headers: { "Content-type": "application/json" },

            body: JSON.stringify({ email, password, name, lastname, floor }),
          });
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      registerSeller: async (email, password, name, lastname, floor, phone, shopName) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/seller/registers`, {
            method: "POST",
            headers: { "Content-type": "application/json" },

            body: JSON.stringify({ email, password, name, lastname, floor, phone, shopName }),
          });
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      registerAdmin: async (email, password, name, lastname, floor, buildingName) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/administrator/registers`, {
            method: "POST",
            headers: { "Content-type": "application/json" },

            body: JSON.stringify({ email, password, name, lastname, floor, buildingName }),
          });
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      getAllRecommendations: async () => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/recommendations`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }
            }
          )
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`)
            return false;
          }
          const data = await response.json()
          console.log("recommendations flux", data)
          setStore({ recommendations: data.recommendations })
        } catch (error) {
          console.error("Error fetching recommendations", error.message)
        }
      },
      createRecommendationAdmin: async (administrator_id) => {
        const store = getStore()
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/administrator/administrator_id/createReco`, {
            method: "POST",
            body: JSON.stringify({
              administrator_id
            }),
            headers: {
              "Content-type": "application/json",
            },
          })
          if (response.ok) {
            console.log("Recomendación desde Admin creada")
          }
        } catch (error) {
          console.error(error)
        }
      }
    },
  };
};

export default getState;
