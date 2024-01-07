import React, { useEffect } from 'react'
import { FieldArray, getIn, FormikErrors, FormikTouched, useFormikContext } from 'formik'
import ClearIcon from '@mui/icons-material/Clear'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material'
import { Select } from '@mui/material'
import { ChangingTextField } from '../../UI/MuiUI/TextFields.styled/ChangingTextField.styled'
import { ActionButton } from '../../UI/MuiUI/Buttons.styled/ActionButton.styled'
import { ModalTypography } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import { IFormValues } from './CreateTrackModal'
import LoaderOval from '../../UI/Loader/LoaderOval'

interface IFormValueErrors {
  bandId: number
  tracks: Array<{
    name: string
    album: string
    year: string
    format: string
    genre: string
  }>
}

interface IBandsData {
  id: number
  location: string
  name: string
}

interface IFormValuesTouched {
  bandId: boolean
  tracks: Array<{ name: boolean; album: boolean; year: boolean; format: boolean; genre: boolean }>
}

interface ICreateTrackForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & {
      target: { name: keyof IFormValues; value: string }
    },
  ) => void
  values: IFormValues
  errors: FormikErrors<IFormValueErrors>
  touched: FormikTouched<IFormValuesTouched>
  bandsLoading: boolean
  bandsData: IBandsData[]
}

const CreateTrackForm = (props: ICreateTrackForm) => {
  const { handleSubmit, handleChange, values, errors, touched, bandsData, bandsLoading } = props

  const { resetForm, setValues } = useFormikContext()

  useEffect(() => {
    return () => resetForm()
  }, [])

  const handleSelectChange = (e: SelectChangeEvent) => {
    const {
      target: { value },
    } = e

    setValues({ ...values, bandId: value })
  }

  const selectedBand = bandsData?.find(band => band.id === values.bandId)

  return (
    <form className="modal_body" onSubmit={handleSubmit}>
      <div className="band_fields_row">
        <ModalTypography textAlign="center" variant="h5">
          Select band to add tracks
        </ModalTypography>
        <div className="band_field_column">
          <ActionButton type="submit">Create</ActionButton>
        </div>
      </div>

      <div className="band_fields_row">
        <div className="band_fields_column">
          <InputLabel id="band-name">Selected band</InputLabel>
          <Select
            labelId="band-name"
            id="band-name-select"
            variant="standard"
            name="bandId"
            className="modal-band-selector"
            value={`${selectedBand?.id ? selectedBand.id : ''}`}
            onChange={handleSelectChange}
            label="Selected band"
            error={touched.bandId && Boolean(errors.bandId)}
          >
            {bandsLoading && <LoaderOval height={20} width={20} />}
            {!bandsLoading &&
              bandsData.map(band => {
                return (
                  <MenuItem key={band.id} value={band.id}>
                    {band.name}
                  </MenuItem>
                )
              })}
          </Select>
        </div>
        {selectedBand && (
          <ChangingTextField
            variant="standard"
            size="small"
            margin="none"
            name="location"
            label="Location"
            value={selectedBand.location}
            disabled
          />
        )}
      </div>

      <ModalTypography textAlign="center" variant="h5">
        Add tracks to band
      </ModalTypography>
      <div className="band_fields_row">
        <div className="band_fields_column">
          <FieldArray name="tracks">
            {({ push, remove }) => (
              <>
                {values.tracks.map((track, index) => {
                  const errorTracks = getIn(errors, 'tracks')
                  const touchTracks = getIn(touched, 'tracks')
                  return (
                    <div key={index} className="band_tracks_list">
                      <ChangingTextField
                        key={`name-${index}`}
                        variant="standard"
                        size="small"
                        margin="none"
                        name={`tracks[${index}].name`}
                        label={`Track ${index + 1}`}
                        value={track.name}
                        onChange={handleChange}
                        error={touchTracks?.[index]?.name && Boolean(errorTracks?.[index]?.name)}
                        helperText={touchTracks?.[index]?.name && errorTracks?.[index]?.name}
                      />
                      <ChangingTextField
                        key={`album-${index}`}
                        variant="standard"
                        size="small"
                        margin="none"
                        name={`tracks[${index}].album`}
                        label={`Album for track ${index + 1}`}
                        value={track.album}
                        onChange={handleChange}
                        error={touchTracks?.[index]?.album && Boolean(errorTracks?.[index]?.album)}
                        helperText={touchTracks?.[index]?.album && errorTracks?.[index]?.album}
                      />
                      <ChangingTextField
                        key={`genre-${index}`}
                        variant="standard"
                        size="small"
                        margin="none"
                        name={`tracks[${index}].genre`}
                        label={`Genre for track ${index + 1}`}
                        value={track.genre}
                        onChange={handleChange}
                        error={touchTracks?.[index]?.genre && Boolean(errorTracks?.[index]?.genre)}
                        helperText={touchTracks?.[index]?.genre && errorTracks?.[index]?.genre}
                      />
                      <ChangingTextField
                        key={`year-${index}`}
                        variant="standard"
                        size="small"
                        margin="none"
                        name={`tracks[${index}].year`}
                        label={`Release year for track ${index + 1}`}
                        value={track.year}
                        onChange={handleChange}
                        error={touchTracks?.[index]?.year && Boolean(errorTracks?.[index]?.year)}
                        helperText={touchTracks?.[index]?.year && errorTracks?.[index]?.year}
                      />
                      <ChangingTextField
                        key={`format-${index}`}
                        variant="standard"
                        size="small"
                        margin="none"
                        name={`tracks[${index}].format`}
                        label={`Format for track ${index + 1}`}
                        value={track.format}
                        onChange={handleChange}
                        error={
                          touchTracks?.[index]?.format && Boolean(errorTracks?.[index]?.format)
                        }
                        helperText={touchTracks?.[index]?.format && errorTracks?.[index]?.format}
                      />
                      <ChangingTextField
                        key={`url-${index}`}
                        variant="standard"
                        size="small"
                        margin="none"
                        name={`tracks[${index}].url`}
                        label={`URL for track ${index + 1}`}
                        value={track.url}
                        onChange={handleChange}
                        error={touchTracks?.[index]?.url && Boolean(errorTracks?.[index]?.url)}
                        helperText={touchTracks?.[index]?.url && errorTracks?.[index]?.url}
                      />
                      <ActionButton
                        type="button"
                        onClick={() => {
                          if (values.tracks.length === 1) return
                          remove(index)
                        }}
                      >
                        <ClearIcon />
                      </ActionButton>
                    </div>
                  )
                })}
                <ActionButton
                  type="button"
                  onClick={() =>
                    push({
                      name: '',
                      album: values.tracks[values.tracks.length - 1]?.album || '',
                      year: values.tracks[values.tracks.length - 1]?.year || '',
                      genre: values.tracks[values.tracks.length - 1]?.genre || '',
                      format: values.tracks[values.tracks.length - 1]?.format || '',
                      url: '',
                    })
                  }
                >
                  Add track
                </ActionButton>
              </>
            )}
          </FieldArray>
        </div>
      </div>
    </form>
  )
}

export default CreateTrackForm
