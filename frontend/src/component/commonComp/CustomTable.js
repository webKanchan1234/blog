import {
    MaterialReactTable,
    createMRTColumnHelper,
    useMaterialReactTable,
  } from 'material-react-table';
  import { Box, Button } from '@mui/material';
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
  import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { allPost } from '../../action/postAction';
  
  const columnHelper = createMRTColumnHelper();
  
  const columns = [
    columnHelper.accessor('_id', {
      header: 'Id',
      size: 40,
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      size: 120,
    }),
    columnHelper.accessor('subtitle', {
      header: 'Subtitle',
      size: 120,
    }),
  ];
  
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });
  
  const CustomTable = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { loading, posts = [] } = useSelector((state) => state.posts);

    useEffect(() => {
      dispatch(allPost());
      setData(posts || [])
    }, [dispatch]);
  

    const handleExportRows = (rows) => {
      const rowData = rows.map((row) => row.original);
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);
    };
  
    const handleExportData = () => {
      const csv = generateCsv(csvConfig)(data);
      download(csvConfig)(csv);
    };

    
      console.log(posts)
    const table = useMaterialReactTable({
      columns,
      data,
      enableRowSelection: true,
      columnFilterDisplayMode: 'popover',
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      renderTopToolbarCustomActions: ({ table }) => (
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
          >
            Export All Data
          </Button>
          <Button
            // disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>
        </Box>
      ),
    });
    if (loading) {
      return <div>Loading...</div>;
    }
    return <MaterialReactTable table={table} />;
  };
  
  export default CustomTable;
  