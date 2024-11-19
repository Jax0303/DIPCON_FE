"use client"

import React, { useState, useEffect } from 'react'
import { Bell, User, LogOut, FileSignature, ChevronRight, ChevronDown, HomeIcon, FileText, BarChart2, HelpCircle, Settings, Users, Calendar, Clock, TrendingUp, AlertCircle, Search, Mail, MessageSquare, Plus, X, ArrowUpDown, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion, AnimatePresence } from 'framer-motion'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import axios from "axios"

// API 기본 URL 설정
const API_BASE_URL = "http://127.0.0.1:8000" // FastAPI 서버 URL

// 쿠키 인증 사용 설정
axios.defaults.withCredentials = true

// 애니메이션 변수 정의
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}

const slideIn = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.3 }
}

// 서명자 인터페이스 정의
interface Signer {
  name: string
  email: string
}

// 계약 조건 인터페이스 정의
interface ContractConditions {
  title: string
  gameTitle: string
  streamerId: string
  gameId: string
  minBroadcastTime: string
  maxBroadcastTime: string
  isMonetized: boolean
  forbiddenWords: string
  allowSpoilers: boolean
  allowContentMonetization: boolean
  allowSoundtrackUse: boolean
  allowViolentContent: boolean
}

// 계약 인터페이스 정의
interface Contract {
  id: string
  title: string
  signers: Signer[]
  date: string
  conditions: ContractConditions
  status: string
}

// API 함수들
const saveContract = async (contractData: any) => {
  const response = await axios.post(`${API_BASE_URL}/contract/save`, contractData)
  return response.data
}

const getContractsByStatus = async (status?: string) => {
  const response = await axios.get(`${API_BASE_URL}/contracts/`, {
    params: { status },
  })
  return response.data
}

const getContractStatusList = async () => {
  const response = await axios.get(`${API_BASE_URL}/contracts/status_list`)
  return response.data
}

const getContractByGameId = async (gameId: string) => {
  const response = await axios.get(`${API_BASE_URL}/contract/${gameId}`)
  return response.data
}

// 메인 컴포넌트
export default function Home() {
  // 상태 변수들 정의
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [signers, setSigners] = useState<Signer[]>([{ name: '', email: '' }])
  const [contractConditions, setContractConditions] = useState<ContractConditions>({
    title: '',
    gameTitle: '',
    streamerId: '',
    gameId: '',
    minBroadcastTime: '',
    maxBroadcastTime: '',
    isMonetized: false,
    forbiddenWords: '',
    allowSpoilers: false,
    allowContentMonetization: false,
    allowSoundtrackUse: false,
    allowViolentContent: false,
  })
  const [emailReminder, setEmailReminder] = useState(false)
  const [smsReminder, setSmsReminder] = useState(false)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [activeTab, setActiveTab] = useState('home')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [contractStatusList, setContractStatusList] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)

  // 컴포넌트 마운트 시 계약 목록과 상태 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await fetchContracts()
      await fetchContractStatusList()
    }
    fetchData()
  }, [selectedStatus])

  // 계약 목록 가져오기 함수
  const fetchContracts = async () => {
    try {
      const data = await getContractsByStatus(selectedStatus)
      setContracts(data)
    } catch (error) {
      console.error("계약 목록 가져오기 오류:", error)
    }
  }

  // 계약 상태 목록 가져오기 함수
  const fetchContractStatusList = async () => {
    try {
      const data = await getContractStatusList()
      setContractStatusList(data)
    } catch (error) {
      console.error("계약 상태 목록 가져오기 오류:", error)
    }
  }

  // 메뉴 토글 함수
  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]
    )
  }

  // 서명자 추가 함수
  const handleAddSigner = () => {
    setSigners([...signers, { name: '', email: '' }])
  }

  // 서명자 제거 함수
  const handleRemoveSigner = (index: number) => {
    setSigners(signers.filter((_, i) => i !== index))
  }

  // 서명자 정보 업데이트 함수
  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    const newSigners = [...signers]
    newSigners[index] = { ...newSigners[index], [field]: value }
    setSigners(newSigners)
  }

  // 계약 조건 변경 함수
  const handleContractConditionsChange = (field: keyof ContractConditions, value: string | boolean) => {
    setContractConditions(prev => ({ ...prev, [field]: value }))
  }

  // 계약 제출 함수
  const handleSubmit = async () => {
    try {
      const newContract: Contract = {
        id: `C${String(contracts.length + 1).padStart(4, '0')}`,
        title: contractConditions.title,
        signers: signers,
        date: new Date().toISOString().split('T')[0],
        conditions: contractConditions,
        status: 'Draft', // 초기 상태
      }
      await saveContract(newContract)
      setContracts([...contracts, newContract])
      setIsModalOpen(false)
      setIsConfirmDialogOpen(false)
      // 폼 상태 초기화
      setCurrentStep(1)
      setSigners([{ name: '', email: '' }])
      setContractConditions({
        title: '',
        gameTitle: '',
        streamerId: '',
        gameId: '',
        minBroadcastTime: '',
        maxBroadcastTime: '',
        isMonetized: false,
        forbiddenWords: '',
        allowSpoilers: false,
        allowContentMonetization: false,
        allowSoundtrackUse: false,
        allowViolentContent: false,
      })
      setEmailReminder(false)
      setSmsReminder(false)
    } catch (error) {
      console.error("계약 저장 오류:", error)
      // TODO: 에러 처리 (예: 사용자에게 알림)
    }
  }

  // 정렬 순서 토글 함수
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  // 정렬된 계약 목록
  const sortedContracts = [...contracts].sort((a, b) => {
    return sortOrder === 'asc' 
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // 사이드바 아이템 정의
  const sidebarItems = [
    { title: '홈', icon: HomeIcon, href: '#', key: 'home' },
    { 
      title: '계약', 
      icon: FileText, 
      subItems: [
        { title: '계약 생성', href: '#', key: 'create-contract' },
        { title: '계약 목록', href: '#', key: 'contract-list' },
        { title: '서명 대기', href: '#', key: 'pending-signatures' },
      ]
    },
    { 
      title: '대시보드', 
      icon: BarChart2, 
      subItems: [
        { title: '계약 통계', href: '#', key: 'contract-stats' },
        { title: '수익 분석', href: '#', key: 'revenue-analysis' },
      ]
    },
    { title: '고객지원', icon: HelpCircle, href: '#', key: 'support' },
    { title: '설정', icon: Settings, href: '#', key: 'settings' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* 사이드바 */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-white p-4 shadow-md hidden md:flex flex-col"
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-orange-500">DIPCON</h1>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="mb-8 bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
        >
          <FileSignature className="h-5 w-5" />
          계약 시작
        </Button>
        <nav className="flex-1">
          {sidebarItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.subItems ? (
                <Collapsible open={openMenus.includes(item.title)} onOpenChange={() => toggleMenu(item.title)}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2 text-orange-500" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus.includes(item.title) ? 'transform rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2 mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <a 
                        key={subIndex} 
                        href={subItem.href} 
                        className="block p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setActiveTab(subItem.key)}
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <a 
                  href={item.href} 
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setActiveTab(item.key)}
                >
                  <item.icon className="h-5 w-5 mr-2 text-orange-500" />
                  <span>{item.title}</span>
                </a>
              )}
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="검색..." 
                  className="pl-9 w-64"
                />
              </div>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">공지사항</Button></li>
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">FAQ</Button></li>
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">문의하기</Button></li>
                <li><Button variant="ghost" className="text-gray-600 hover:text-orange-500">이용가이드</Button></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto p-4 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInUp}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">총 계약 건수</CardTitle>
                      <FileText className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{contracts.length}</div>
                      <p className="text-xs text-gray-500">전월 대비 +15%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">활성 계약</CardTitle>
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,832</div>
                      <p className="text-xs text-gray-500">전월 대비 +8%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">신규 계약</CardTitle>
                      <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">284</div>
                      <p className="text-xs text-gray-500">이번 달 신규 계약</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">만료 예정</CardTitle>
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45</div>
                      <p className="text-xs text-gray-500">30일 이내 만료</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>최근 계약 현황</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {contracts.slice(0, 5).map((contract, index) => (
                          <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div>
                              <p className="font-medium">{contract.title}</p>
                              <p className="text-sm text-gray-500">{contract.signers.map(s => s.name).join(', ')}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{contract.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>계약 유형별 통계</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { type: "스트리밍 계약", count: 1245, percentage: 45 },
                          { type: "홍보 계약", count: 856, percentage: 31 },
                          { type: "스폰서십", count: 421, percentage: 15 },
                          { type: "마케팅", count: 156, percentage: 6 },
                          { type: "기타", count: 83, percentage: 3 },
                        ].map((stat, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{stat.type}</span>
                              <span className="text-sm text-gray-500">{stat.count}건</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${stat.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'contract-list' && (
              <motion.div
                key="contract-list"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInUp}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>계약 목록</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Label>계약 상태 필터</Label>
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value || undefined)}
                      >
                        <option value="">모든 상태</option>
                        {contractStatusList.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>계약 번호</TableHead>
                          <TableHead>계약 제목</TableHead>
                          <TableHead>서명자</TableHead>
                          <TableHead className="cursor-pointer" onClick={toggleSortOrder}>
                            계약 날짜
                            <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                          </TableHead>
                          <TableHead>상태</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedContracts.map((contract) => (
                          <TableRow key={contract.id}>
                            <TableCell>{contract.id}</TableCell>
                            <TableCell>{contract.title}</TableCell>
                            <TableCell>{contract.signers.map(s => s.name).join(', ')}</TableCell>
                            <TableCell>{contract.date}</TableCell>
                            <TableCell>{contract.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="bg-white text-gray-600 mt-12 py-8 border-t">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 DIPCON. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-orange-500">계약 생성</DialogTitle>
                  <DialogDescription>
                    <div className="flex justify-between items-center mt-4">
                      {[1, 2, 3].map((step) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: step * 0.1 }}
                          className={`flex items-center ${currentStep >= step ? 'text-orange-500' : 'text-gray-400'}`}
                        >
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 ${currentStep >= step ? 'border-orange-500' : 'border-gray-400'}`}>
                            {step}
                          </div>
                          <span>{step === 1 ? '서명자 정보' : step === 2 ? '계약 조건' : '계약 검토'}</span>
                        </motion.div>
                      ))}
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={slideIn}
                    className="mt-6"
                  >
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="contract-title">계약 제목</Label>
                          <Input
                            id="contract-title"
                            value={contractConditions.title}
                            onChange={(e) => handleContractConditionsChange('title', e.target.value)}
                            placeholder="계약 제목을 입력하세요"
                            className="mt-1"
                          />
                        </div>
                        {signers.map((signer, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex justify-between items-center">
                              <Label className="text-lg font-semibold">서명자 {index + 1}</Label>
                              {index > 0 && (
                                <Button variant="ghost" size="sm" onClick={() => handleRemoveSigner(index)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`name-${index}`}>이름</Label>
                                <Input
                                  id={`name-${index}`}
                                  value={signer.name}
                                  onChange={(e) => updateSigner(index, 'name', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`email-${index}`}>이메일</Label>
                                <Input
                                  id={`email-${index}`}
                                  type="email"
                                  value={signer.email}
                                  onChange={(e) => updateSigner(index, 'email', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <Button onClick={handleAddSigner} variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" /> 새 서명자 추가
                        </Button>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <Tabs defaultValue="basic" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="basic">기본 정보</TabsTrigger>
                            <TabsTrigger value="advanced">고급 설정</TabsTrigger>
                          </TabsList>
                          <TabsContent value="basic">
                            <Card>
                              <CardContent className="space-y-4 pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="gameTitle">게임 제목</Label>
                                    <Input
                                      id="gameTitle"
                                      value={contractConditions.gameTitle}
                                      onChange={(e) => handleContractConditionsChange('gameTitle', e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="streamerId">스트리머 ID</Label>
                                    <Input
                                      id="streamerId"
                                      value={contractConditions.streamerId}
                                      onChange={(e) => handleContractConditionsChange('streamerId', e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="gameId">게임 ID</Label>
                                  <Input
                                    id="gameId"
                                    value={contractConditions.gameId}
                                    onChange={(e) => handleContractConditionsChange('gameId', e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="minBroadcastTime">최소 방송시간</Label>
                                    <Input
                                      id="minBroadcastTime"
                                      value={contractConditions.minBroadcastTime}
                                      onChange={(e) => handleContractConditionsChange('minBroadcastTime', e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="maxBroadcastTime">최대 방송시간</Label>
                                    <Input
                                      id="maxBroadcastTime"
                                      value={contractConditions.maxBroadcastTime}
                                      onChange={(e) => handleContractConditionsChange('maxBroadcastTime', e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="advanced">
                            <Card>
                              <CardContent className="space-y-4 pt-6">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="isMonetized">수익화 여부</Label>
                                  <Switch
                                    id="isMonetized"
                                    checked={contractConditions.isMonetized}
                                    onCheckedChange={(checked) => handleContractConditionsChange('isMonetized', checked)}
                                  />
                                </div>
                                {contractConditions.isMonetized && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                  >
                                    <div>
                                      <Label htmlFor="forbiddenWords">금지어</Label>
                                      <Textarea
                                        id="forbiddenWords"
                                        value={contractConditions.forbiddenWords}
                                        onChange={(e) => handleContractConditionsChange('forbiddenWords', e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>추가 조건</Label>
                                      <div className="space-y-2">
                                        {[
                                          { id: 'allowSpoilers', label: '스포일러 허용' },
                                          { id: 'allowContentMonetization', label: '저작물 수익화 허용' },
                                          { id: 'allowSoundtrackUse', label: '사운드트랙 사용 허용' },
                                          { id: 'allowViolentContent', label: '폭력 및 선정성 컨텐츠 허용' },
                                        ].map(({ id, label }) => (
                                          <div key={id} className="flex items-center space-x-2">
                                            <Checkbox
                                              id={id}
                                              checked={contractConditions[id as keyof ContractConditions] as boolean}
                                              onCheckedChange={(checked) => handleContractConditionsChange(id as keyof ContractConditions, checked as boolean)}
                                            />
                                            <Label htmlFor={id}>{label}</Label>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>계약 내용 요약</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-semibold">계약 제목</Label>
                                <p>{contractConditions.title}</p>
                              </div>
                              <div>
                                <Label className="font-semibold">게임 제목</Label>
                                <p>{contractConditions.gameTitle}</p>
                              </div>
                              <div>
                                <Label className="font-semibold">스트리머 ID</Label>
                                <p>{contractConditions.streamerId}</p>
                              </div>
                              <div>
                                <Label className="font-semibold">게임 ID</Label>
                                <p>{contractConditions.gameId}</p>
                              </div>
                              <div>
                                <Label className="font-semibold">방송 시간</Label>
                                <p>{contractConditions.minBroadcastTime} - {contractConditions.maxBroadcastTime}</p>
                              </div>
                              <div>
                                <Label className="font-semibold">수익화 여부</Label>
                                <p>{contractConditions.isMonetized ? '예' : '아니오'}</p>
                              </div>
                            </div>
                            {contractConditions.isMonetized && (
                              <div className="space-y-2">
                                <Label className="font-semibold">추가 조건</Label>
                                <ul className="list-disc list-inside space-y-1">
                                  <li>스포일러 허용: {contractConditions.allowSpoilers ? '예' : '아니오'}</li>
                                  <li>저작물 수익화 허용: {contractConditions.allowContentMonetization ? '예' : '아니오'}</li>
                                  <li>사운드트랙 사용 허용: {contractConditions.allowSoundtrackUse ? '예' : '아니오'}</li>
                                  <li>폭력 및 선정성 컨텐츠 허용: {contractConditions.allowViolentContent ? '예' : '아니오'}</li>
                                </ul>
                                <div>
                                  <Label className="font-semibold">금지어</Label>
                                  <p>{contractConditions.forbiddenWords || '없음'}</p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>서명자 정보</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {signers.map((signer, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <Check className="h-4 w-4 text-green-500" />
                                  <span>{signer.name} ({signer.email})</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>계약 리마인더</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="emailReminder"
                                checked={emailReminder}
                                onCheckedChange={(checked) => setEmailReminder(checked as boolean)}
                              />
                              <Label htmlFor="emailReminder">이메일 알림</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="smsReminder"
                                checked={smsReminder}
                                onCheckedChange={(checked) => setSmsReminder(checked as boolean)}
                              />
                              <Label htmlFor="smsReminder">SMS 알림</Label>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                  >
                    이전
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentStep < 3) {
                        setCurrentStep(prev => prev + 1)
                      } else {
                        setIsConfirmDialogOpen(true)
                      }
                    }}
                  >
                    {currentStep < 3 ? '다음' : '완료'}
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>계약 저장</AlertDialogTitle>
            <AlertDialogDescription>
              계약 내용을 저장하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니오</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>예</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}