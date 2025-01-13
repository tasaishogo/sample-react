import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAtom } from 'jotai'
import { createClient } from '@supabase/supabase-js'
import { recorder } from './atoms/logAtom'
import { FormGroups } from './components/FormGroups'
import { PreviewList } from './components/PreviewList'
import { LogList } from './components/LogList'
import { ProgressTracker } from './components/ProgressTracker'


const supabaseUrl = 'https://zoxklvmfjkmmooqzscem.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const LearningLog = () => {
  const [logTitle, setLogTitle] = useState("")
  const [logTime, setLogTime] = useState(0)
  const [records, setRecords] = useAtom(recorder)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const queryAllLogs = async () => {
    const { data, error } = await supabase
      .from('study-record')
      .select('*')
    if (error) {
      throw error
    }
    return data
  }

  const addLearningLog = async ({ title, time }) => {
    if (title === '') {
      setError('学習項目を入力してください')
      return
    } else if (time === 0 || time === '') {
      setError('学習時間を入力してください')
      return
    }
    const { data, error } = await supabase
      .from('study-record')
      .insert([{ title, time }])
      .select()
    if (error) {
      throw error
    }
    const id = data[0]['id']
    setRecords([...records, { id, title, time }])
    setLogTitle('')
    setLogTime(0)
    error !== '' && setError('');
  }

  useEffect(() => {
    setLoading(true)
    queryAllLogs().then((data) => {
      setRecords(data)
      setLoading(false)
    })
  }, [])

  const onChangeLogTitle = useCallback((e) => {
    setLogTitle(e.target.value)
  }, [])

  const onChangeLogTime = useCallback((e) => {
    setLogTime(e.target.value)
  }, [])

  const InputItems = useMemo(() => [
    { label: "学習項目", key: "title", type: "text", placeholder: "学習項目の概要を入力してください", value: logTitle, onChange: onChangeLogTitle },
    { label: "学習時間", key: "time", type: "number", placeholder: "学習時間を入力してください", value: logTime, onChange: onChangeLogTime }
  ], [logTitle, logTime])

  return (
    <>
      <h1>学習記録</h1>
      <FormGroups items={InputItems} />
      <PreviewList items={InputItems} />
      <button onClick={() => addLearningLog({ title: logTitle, time: logTime })}>登録</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProgressTracker title="学習時間" unit="h" max="1000" target_key="time" />
      {loading ? <p>データのロード中です</p> : <LogList supabase={supabase} />}
    </>
  )
}
