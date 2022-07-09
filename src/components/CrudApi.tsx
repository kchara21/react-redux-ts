import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";

import { useSelector, useDispatch } from "react-redux";
import {
  createApiData,
  deleteApiData,
  noData,
  readAllData,
  selectCrudApi,
  updateApiData,
} from "../reducers/crudReducer";



interface error {
  status: string;
  statusText: string;
}

const CrudApi = () => {
  // const [db, setDb] = useState<formData[]>([]);
  
  const {db} = useSelector(selectCrudApi);
  const dispatch = useDispatch();


  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState<error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  let api = helpHttp();
  let url = "http://localhost:5000/estudiantes";

  useEffect(() => {
    setLoading(true);
    helpHttp()
    .get(url).then((res) => {
      if (!res.err) {
        //  setDb(res);
        dispatch(readAllData(res));
        setError(null);
      } else {
        //setDb([]);
        dispatch(noData());
        setError(res);
      }
    });

    setLoading(false);
  }, [url,dispatch]);

  const createData = (data: any) => {
    data.id = Date.now();
    // setDb([...db, data]);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        //  setDb([...db, res]);
        dispatch(createApiData(res));
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data: any) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        // let newData = db.map((el: any) => (el.id === data.id ? data : el));
        // setDb(newData);
        dispatch(updateApiData(res));
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id: number) => {
    let isDetele = window.confirm(
      `Are you sure to delete this register with the id ${id}`
    );

    if (isDetele) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          // let newData = db.filter((el: any) => el.id !== id);
          // setDb(newData);
          dispatch(deleteApiData(res));
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />} {/* When loading is true active Loader...  */}
        {error && (
          <Message
            msg={`Error ${error.status}:${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {/* When error is true active Message...  */}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
        {/* When db have Data active CrudTable...  */}
      </article>
    </div>
  );
};

export default CrudApi;
