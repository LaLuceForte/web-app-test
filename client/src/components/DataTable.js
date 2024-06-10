import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// компонент для отображения данных в виде таблицы ag-grid с поддержкой infinite loading 
const DataTable = ({ api, columnsDefs }) => {
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: async (params) => {
          const offset = params.startRow;
          const limit = params.endRow - params.startRow;

          try {
            const response = await axios.get(`${api}?limit=${limit}&offset=${offset}`);
            const rowData = response.data;
            const lastRow = rowData.length < limit ? params.startRow + rowData.length : -1;
            params.successCallback(rowData, lastRow);
          } catch (error) {
            console.error('Error fetching data:', error);
            params.failCallback();
          }
        },
      };

      gridApi.setGridOption('datasource', dataSource);

      return () => {
        if (!gridApi.isDestroyed()) {
          gridApi.setGridOption('datasource', null);
        }
      };
    }
  }, [gridApi, api]);


  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const adjustedColumnDefs = columnsDefs.map(col => ({
    ...col,
    flex: 1,
    minWidth: 100,
  }));

  return (
    <div className="ag-theme-alpine" style={{ height: '350px', width: '100%' }}>
      <AgGridReact
        columnDefs={adjustedColumnDefs}
        onGridReady={onGridReady}
        rowModelType="infinite"
        modules={[InfiniteRowModelModule]}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 10, 20, 50, 100]}
        cacheBlockSize={5}
        maxBlocksInCache={5}
        domLayout='normal'
        suppressHorizontalScroll={true}
      />
    </div>
  );
};

export default DataTable;
