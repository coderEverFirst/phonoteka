import React, { useState, ChangeEvent, useEffect } from 'react'
import { FieldArray, getIn, FormikErrors, FormikTouched, useFormikContext } from 'formik'
import ClearIcon from '@mui/icons-material/Clear'
import { allowedImageTypes } from '../../../variables/variables'
import { ChangingTextField } from '../../UI/MuiUI/TextFields.styled/ChangingTextField.styled'
import { ActionButton } from '../../UI/MuiUI/Buttons.styled/ActionButton.styled'
import { ModalTypography } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import { IFormValues } from './CreateBandModal'

interface IFormValueErrors {
  name: string
  foundationDate: string
  about: string
  tracks: Array<{
    name: string
    album: string
    year: string
    format: string
    genre: string
  }>
  description: string
  image: string
  location: string
  members: string
}

interface IFormValuesTouched {
  name: boolean
  foundationDate: boolean
  about: boolean
  tracks: Array<{ name: boolean; album: boolean; year: boolean; format: boolean; genre: boolean }>
  description: boolean
  image: boolean
  location: boolean
  members: boolean
}

interface ICreateBandForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & {
      target: { name: keyof IFormValues; value: string }
    },
  ) => void
  setSelectedImg: (selectedImg: File) => void
  values: IFormValues
  errors: FormikErrors<IFormValueErrors>
  touched: FormikTouched<IFormValuesTouched>
}

const CreateBandForm = (props: ICreateBandForm) => {
  const { handleSubmit, handleChange, setSelectedImg, values, errors, touched } = props
  const [previewImg, setPreviewImg] = useState<string>('')
  const [dndError, setDndError] = useState<string>('')

  const { resetForm } = useFormikContext()

  useEffect(() => {
    return () => resetForm()
  }, [])

  const handleDragStart = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setDndError('')
  }

  const handleDragLeave = (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }

  const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files: FileList | null = event.dataTransfer.files

    if (files && files.length > 0) {
      const file: File = files[0]
      const fileType: string = file.type

      if (allowedImageTypes.includes(fileType)) {
        const objectURL = URL.createObjectURL(file)
        setPreviewImg(objectURL)
        setSelectedImg(file)
      } else {
        setDndError(fileType)
      }
    }
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    const fileType: string = file.type

    if (file) {
      if (allowedImageTypes.includes(fileType)) {
        const objectURL = URL.createObjectURL(file)
        setPreviewImg(objectURL)
        setSelectedImg(file)
      } else {
        setDndError(fileType)
      }
    }
  }

  return (
    <form className="modal_body" onSubmit={handleSubmit}>
      <ModalTypography textAlign="center" variant="h5">
        General band info
      </ModalTypography>
      <div className="band_fields_row">
        <div className="band_fields_column">
          <ChangingTextField
            variant="standard"
            size="small"
            margin="none"
            name="name"
            label="Band name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <ChangingTextField
            variant="standard"
            size="small"
            margin="none"
            name="foundationDate"
            label="Foundation date"
            value={values.foundationDate}
            onChange={handleChange}
            error={touched.foundationDate && Boolean(errors.foundationDate)}
            helperText={touched.foundationDate && errors.foundationDate}
          />
        </div>
        <div className="band_field_column">
          <ChangingTextField
            variant="standard"
            size="small"
            margin="none"
            name="location"
            label="Location"
            value={values.location}
            onChange={handleChange}
            error={touched.location && Boolean(errors.location)}
            helperText={errors.location}
          />
        </div>
        <div className="band_field_column">
          <ActionButton type="submit">Create</ActionButton>
        </div>
      </div>
      <div className="band_fields_row band_fields_row_wide">
        <div className="band_fields_column">
          <ChangingTextField
            multiline
            variant="standard"
            size="small"
            margin="none"
            name="members"
            label="Members"
            value={values.members}
            onChange={handleChange}
            error={touched.members && Boolean(errors.members)}
            helperText={touched.members && errors.members}
          />
          <ChangingTextField
            multiline
            variant="standard"
            size="small"
            margin="none"
            name="about"
            label="About band"
            value={values.about}
            onChange={handleChange}
            error={touched.about && Boolean(errors.about)}
            helperText={touched.about && errors.about}
          />
          <ChangingTextField
            multiline
            variant="standard"
            size="small"
            margin="none"
            name="description"
            label="Description"
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </div>
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
      <ModalTypography textAlign="center" variant="h5">
        Add cover image for band
      </ModalTypography>
      <div className="band_image_selector">
        {previewImg && <img src={previewImg} alt="band_cover" className="band_cover_preview" />}
        <div
          className={`modal_dnd ${dndError && 'band_image_error'}`}
          onDragStart={event => handleDragStart(event)}
          onDragLeave={event => handleDragLeave(event)}
          onDragOver={event => handleDragStart(event)}
          onDrop={event => handleOnDrop(event)}
        >
          <div className="modal-drop-info">
            {dndError && <p className="modal_drop_error">Invalid image format: {dndError}</p>}
            <div>
              <input type="file" className="modal-input" onChange={handleFile} />
              <span>Drag here</span> your file or <span>Click here</span> to upload band cover image
              <p> File must be in png or jpeg format</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateBandForm
