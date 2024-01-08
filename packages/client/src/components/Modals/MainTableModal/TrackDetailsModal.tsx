import React, { useEffect } from 'react'
import { Backdrop, Box, Fade } from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { fromError, useMutation, useQuery } from '@apollo/client'

import { DetailModal } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import { UPDATE_TRACK_MUTATION } from '../../../apollo/mutation/band'
import { GET_ALL_BANDS_QUERY } from '../../../apollo/queries/band'
import { trackValidationSchema } from '../../../validations/trackValidationSchema'
import { shouldRefetchTracks } from '../../../reactiveVars'
import TrackForm from '../Forms/TrackForm'
import { ISelectedTrack } from '../../Table/TableComponents/TableBodyContent'

interface ITrackDetails {
  handleCloseModal: () => void
  openModal: boolean
  selectedTrack: ISelectedTrack
}

interface IHandleFormSubmit {
  setValues: (
    values: React.SetStateAction<ISelectedTrack>,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<ISelectedTrack>>
}

const TrackDetailsModal = (props: ITrackDetails) => {
  const { handleCloseModal, openModal, selectedTrack } = props

  useEffect(() => {
    return () => {
      shouldRefetchTracks(false)
    }
  }, [])

  const [updateTrackMutation] = useMutation(UPDATE_TRACK_MUTATION)
  const { data: bandsData, loading: bandsLoading } = useQuery(GET_ALL_BANDS_QUERY)

  const handleFormSubmit: (
    values: ISelectedTrack,
    { setValues }: IHandleFormSubmit,
  ) => Promise<void> = async values => {
    try {
      await updateTrackMutation({
        variables: { input: values },
      })
      handleCloseModal()
      shouldRefetchTracks(true)
    } catch (serverError) {
      console.error('Track update error', fromError(serverError))
    }
  }

  return (
    <DetailModal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box component="div">
          <Formik
            initialValues={selectedTrack}
            validationSchema={trackValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => {
              return (
                <TrackForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  errors={errors}
                  touched={touched}
                  bandsData={bandsData?.getAllBands}
                  bandsLoading={bandsLoading}
                  isTrackEditing
                  mainFormTitle="Selected band"
                  tracksFormTitle="Edit track"
                />
              )
            }}
          </Formik>
        </Box>
      </Fade>
    </DetailModal>
  )
}

export default TrackDetailsModal
